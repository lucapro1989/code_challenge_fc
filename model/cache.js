var mongoose = require('mongoose');

// Define our client schema
var Schema = new mongoose.Schema({
    string: {
        type: String,
        unique: true,
        required: true
    },
    time_to_live: Number,
    created: Date,
    active: Boolean

}, {
    collection: 'cache'
});

// Export the Mongoose model
module.exports = mongoose.model('Cache', Schema);
