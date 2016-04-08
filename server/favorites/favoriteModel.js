var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;


var FavoriteSchema = new Schema({
    picture: String,
    // user_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    created_at: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Favorite', FavoriteSchema);
