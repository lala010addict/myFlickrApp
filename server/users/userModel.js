var mongoose = require('bluebird').promisifyAll(require('mongoose')),

    Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: String,
    name: String,
    email: {
        type: String,
        lowercase: true
    },
    access_token: String,
    role: {
        type: String,
        default: 'user'
    },
    provider: String,
    salt: String,
    flickr: {}
});

/**
 * Virtuals
 */

// Public profile information
UserSchema
    .virtual('profile')
    .get(function() {
        return {
            'name': this.name,
            'role': this.role
        };
    });

// Non-sensitive info we'll be putting in the token
UserSchema
    .virtual('token')
    .get(function() {
        return {
            '_id': this._id,
            'role': this.role
        };
    });

module.exports = mongoose.model('User', UserSchema);
