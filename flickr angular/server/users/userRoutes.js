var express = require('express');
var router = express.Router();
var session = require('express-session');
var mongoose = require('mongoose')
var User = mongoose.model('User')
var async = require('async')
var auth = require('../config/authorization.js')
var path = require('path');


var isAuthenticated = function(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

module.exports = function(passport) {

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


  router.get('/login/flickr/callback', function(req, res, next) {
    passport.authenticate('flickr', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/login/flickr');
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
     res.redirect('/' + user.name);
        //   return   res.sendfile('client/index.html')
        //   return res.sendfile('client/index.html', {
        //     username : 'booh!'
        // });
      });
    })(req, res, next);

    console.log(res, req)
  //  return res.sendfile('client/index.html')

  });




// router.get('/', function(request, res, next) {

//       res.redirect('/')

//     });


    router.get('/:name', function(request, res, next) {
      // var username = request.params.name;
      // console.log(username);
      //  res.sendfile(path.join(__dirname + '/index.html'));
      res.sendfile('client/index.html')

    });







  // GET /logout
  router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
  });

  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });



  return router;
}
