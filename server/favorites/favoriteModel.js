var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;


var FavoriteSchema = new Schema({
    picture_id: {
        type: String,
        required: true
    },
    picture_farm: {
        type: String,
        required: true
    },
    picture_server: {
        type: String,
        required: true
    },
    picture_secret: {
        type: String,
        required: true
    },
    picture_photosetID: {
        type: String,
        required: true
    },
    picture_photosetName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Favorite', FavoriteSchema);
