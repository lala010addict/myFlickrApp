var mongoose = require('mongoose');
var Movie = require("../movies/movieModel")

module.exports = mongoose.model('User', {
  id: String,
  access_token: String,
  email: String,
  name: String
});
