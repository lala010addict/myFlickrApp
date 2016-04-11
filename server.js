var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var dbConfig = require('./server/config/db');
var mongoose = require('mongoose');
// Connect to DB
if (process.env.MONGOLAB_URI) {
    mongoose.connect(process.env.MONGOLAB_URI);
} else {
    mongoose.connect(dbConfig.url);
}

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
    console.log('db connection open, sweet!');
    startServer();
});



var app = express();

require('./server/config/middleware.js')(app, express);

// Configuring Passport
var passport = require('passport');
var session = require('express-session');

app.use(session({ secret: 'mySecretKey' }));
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./server/config/init');
initPassport(passport);

var routes = require('./server/users/userRoutes')(passport);
//app.use(express.static(__dirname + '/client'));

app.use('/', routes);
// var movies = require('./server/movies/movieDBController');
// app.use('/movies', movies);

//app.use('/', routes);

// This middleware will allow us to use the currentUser in our views and routes.
app.use(function(req, res, next) {
    global.currentUser = req.user;
    next();
});

app.use('/api/favorites', require('./server/favorites'));
// app.use('/api/users', require('./server/users/userRoutes'));

function startServer() {
    var server = app.listen(process.env.PORT || 3000, function() {
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    });
}


module.exports = app;
