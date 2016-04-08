var mongoose = require('mongoose');

module.exports = mongoose.model('Favorite', {
 picture: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});
