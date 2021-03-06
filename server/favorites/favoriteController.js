/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/favorites              ->  index
 * POST    /api/favorites              ->  create
 * GET     /api/favorites/:id          ->  show
 * PUT     /api/favorites/:id          ->  update
 * DELETE  /api/favorites/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Favorite = require('./favoriteModel');


function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

function responseWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function saveUpdates(updates) {
    return function(entity) {
        var updated = _.merge(entity, updates);
        return updated.saveAsync()
            .spread(function(updated) {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.removeAsync()
                .then(function() {
                    res.status(204).end();
                });
        }
    };
}

// Gets a list of Favorites
exports.index = function(req, res) {
    Favorite.findAsync()
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Gets a single Favorite from the DB
exports.show = function(req, res) {
    Favorite.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Creates a new Favorite in the DB
exports.create = function(req, res) {
    Favorite.findOne({
        'picture_id': req.picture_id
    }, function(err, user) {

        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err)
            return done(err);

        // if the user is found, then log them in
        if (user) {
          console.log('existing')
            return done(null, user); // user found, return that user
        } else {
            Favorite.createAsync(req.body)
                .then(responseWithResult(res, 201))
                .catch(handleError(res));
        }

    });

};

// Updates an existing Favorite in the DB
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Favorite.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
};

// Deletes a Favorite from the DB
exports.destroy = function(req, res) {
    Favorite.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
};
