var mongoose = require('mongoose');

var User = require('../Models/usersModel')

var createUser = function(req, res) {
  new User({name: req.body.name,
    photo: req.body.photo,
    email: req.body.email,
    fbId: req.body.fbId,
    googleId: req.body.googleId})
      .save()
      .then(function(data) {
        console.log("createUser add User successful: ", data)
      })
      .catch(function(err) {
        console.log("ERROR createUser add User: ", err)
      })
}

var getUser = function(req, res) {
  return User.find({ name: req.body.name }) //Can take a callback as a second argument if needed
  //Return what? May need to utilize callback to return data in specific format
}

var updateUser = function(req, res) {
  //What should they be able to update

  User.update({ name: req.body.name},
    { email: req.body.email },
    { photo: req.body.photo },
    function (err, raw) {
      if (err) {
        console.log(err)
      }
      res.send('ERROR updateUser: ', raw);
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
