var User = require('./userModel');
var passport = require('passport');
var config = require('../config/auth.js');
var jwt = require('jsonwebtoken');

function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function(err) {
        res.status(statusCode).json(err);
    }
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

/**
 * Get list of users
 * restriction: 'admin'
 */

exports.index = function(req, res) {
    User.findAsync({}, '-salt -password')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(handleError(res));
}

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.saveAsync()
        .spread(function(user) {
            var token = jwt.sign({ _id: user._id }, config.secrets.session, {
                expiresIn: 60 * 60 * 5
            });
            res.json({ token });
        })
        .catch(validationError(res));
}

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
    var userId = req.params.id;

    User.findByIdAsync(userId)
        .then(user => {
            if (!user) {
                return res.status(404).end();
            }
            res.json(user.profile);
        })
        .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
    User.findByIdAndRemoveAsync(req.params.id)
        .then(function() {
            res.status(204).end();
        })
        .catch(handleError(res));
}

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findByIdAsync(userId)
        .then(user => {
            if (user.authenticate(oldPass)) {
                user.password = newPass;
                return user.saveAsync()
                    .then(() => {
                        res.status(204).end();
                    })
                    .catch(validationError(res));
            } else {
                return res.status(403).end();
            }
        });
}

/**
 * Get my info
 */
exports.me = function(req, res, next) {
    var userId = req.user._id;
 

    User.findOneAsync({ _id: userId }, '-salt -password')
        .then(user => { // don't ever give out the password or salt
            if (!user) {
                return res.status(401).end();
            }
            res.json(user);
        })
        .catch(err => next(err));
}

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
}
