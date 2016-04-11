var express = require('express');
var router = express.Router();
var session = require('express-session');
var mongoose = require('mongoose')
var User = mongoose.model('User')
var async = require('async')
var auth = require('../config/auth.service.js')
var passport = require('passport');
var path = require('path');
var jwt = require('jsonwebtoken');
var config = require('../config/auth');

var controller = require('./userController.js');

var signToken = function(id, role) {
    return jwt.sign({ _id: id, role: role }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
    });
}

/**
 * Set token cookie directly for oAuth strategies
 */
var setTokenCookie = function(req, res) {
    if (!req.user) {
        return res.status(404).send('It looks like you aren\'t logged in, please try again.');
    }
    // console.log(req.user, 'req.user._id')
    var token = signToken(req.user._id, req.user.role);
    //   console.log(token, 'tokentokentokentokentokentokentokentoken')
    res.cookie('token', token);
    res.redirect('/' + req.user.name);
}



module.exports = function() {

    // route for flickr authentication and login
    // different scopes while logging in

    router.get('/login/flickr',
        passport.authenticate('flickr'),
        function(req, res) {
            // The request will be redirected to Flickr for authentication, so this
            // function will not be called.
        });


    // the callback after flickr has authenticated the user
    // router.get('/login/flickr/callback',
    //   passport.authenticate('flickr', {
    //     failureRedirect: '/login/flickr'
    //   }),
    //   function(req, res) {
    //     // Successful authentication, redirect home.
    //     res.redirect('/'+User.displayName);
    //   });


    router.get('/login/flickr/callback', passport.authenticate('flickr', {
        failureRedirect: '/signup',
        session: false
    }), setTokenCookie);



    // router.get('/', function(request, res, next) {

    //       res.redirect('/')

    //     });


    router.get('/:name', function(request, res, next) {
        // var username = request.params.name;
        // console.log(username);
        //  res.sendfile(path.join(__dirname + '/index.html'));
        res.sendfile('client/index.html')

    });




    router.get('/api/users', controller.index);
    // router.delete('/:id', auth.hasRole('admin'), controller.destroy);
    router.get('/api/users/me', auth.isAuthenticated(), controller.me);
    // router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
    router.get('/api/users/:id', auth.isAuthenticated(), controller.show);
    // router.post('/', controller.create);
    // router.use('/me/favorites', auth.isAuthenticated(), controller.meParams, require('../favorites'));



    // GET /logout
    router.get('/flickr/logout', function(req, res, next) {
      
        req.session.destroy();
          console.log(req.session, 'req.session')
        // res.redirect('/');
    });

    router.get('/', function(req, res, next) {
        res.send('respond with a resource');
    });



    return router;
}
