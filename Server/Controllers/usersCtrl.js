var mongoose = require('mongoose');

var User = require('../Models/usersModel')

var createUser = function(req, res) {
  new User({name: req.body.name, photo: req.body.photo, email: req.body.email, fbId: req.body.fbId, googleId: req.body.googleId})
}

var getUser = function(req, res) {
  return User.find({ name: req.body.name }) //Can take a callback as a second argument if needed
}

var updateUser = function(req, res) {
  //Find user_id by name

  User.findByIdAndUpdate(id, { $set: { name: req.body.name }}, { new: true }, function (err, name) {
    if (err) {
      console.log(err)
    }
    res.send(name);
  });
}

var createPin = function(req, res) {
  //Query user to pull pin array, push into array variable

  //push req.body.pin into array variable

  //Update user field with pin array
}

var deletePin = function(req, res) {
  //Query user to pull pin array, find index of req.body.pin

  //splice req.body.pin out of pin array with index

  //Update user field with pin array
}

var createSpot = function(req, res) {
  //Query user to pull spot array, push into array variable

  //push req.body.spot into array variable

  //Update user field with spot array
}

var deleteSpot = function(req, res) {
  //Query user to pull spot array, find index of req.body.spot

  //splice req.body.spot out of spot array with index

  //Update user field with spot array
}

module.exports = userCtrl
