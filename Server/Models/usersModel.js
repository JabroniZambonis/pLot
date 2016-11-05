var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/subjectToChange');

var locations = require('/locationsModel')

var userSchema = mongoose.Schema({
    name: {type: String, required: true},
    photo: {type: String, required: true},
    createdPins: [{type:Schema.ObjectId, ref:'locations'}],
    savedPins: ,
    createdSpots: [],
    savedSpots: ,
    email: {type: String, required: true, unique: true},
    fbId: type: String,
    googleId: type: String
});

var user = mongoose.model('User', userSchema)

module.exports = user
