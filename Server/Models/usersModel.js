var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/subjectToChange');

var locations = require('/locationsModel')

var userSchema = mongoose.Schema({
    name: {type: String, require: true},
    photo: {type: String, require: true},
    createdPins: [{type:Schema.ObjectId, ref:'locations'}],
    savedPins: ,
    createdSpots: [],
    savedSpots: ,
    email: {type: String, require: true},
    fbId: type: String,
    googleId: type: String
});
