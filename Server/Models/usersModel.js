const mongoose = require('mongoose');
const Schema = mongoose.Schema


var userSchema = new Schema({
    name: {type: String, required: true},
    photo: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    fbId: {type: String},
    fbAccessToken: {type: String},
    googleId: {type: String},
    createdPins: [{type: Schema.ObjectId, ref:'Location'}],
    savedPins: [{type: Schema.ObjectId, ref: 'Location'}],
    
});

var User = mongoose.model('User', userSchema)

module.exports = User
