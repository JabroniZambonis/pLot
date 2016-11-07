const mongoose = require('mongoose');
const User = require('../Models/usersModel')
const db = require('../db.js')

exports.createUser = function(req, res) {
  console.log("˜_˜_˜_˜_˜_˜_˜_˜_˜_˜_˜_˜_˜_˜_˜_˜_˜_˜_˜_˜_˜_˜: ", req.body)
  new User({name: req.body.name,
    photo: req.body.photo,
    email: req.body.email,
    fbId: req.body.fbId,
    googleId: req.body.googleId})
      .save()
      .then(function(data) {
        console.log("createUser add User successful: ", data)
        res.send("Your mom is in my database bro")
      })
      .catch(function(err) {
        console.log("ERROR createUser add User: ", err)
      })
}

exports.getUser = function(req, res) {
  return User.find({ name: req.body.name }) //Can take a callback as a second argument if needed
  //Return what? May need to utilize callback to return data in specific format
}

exports.updateUser = function(req, res) {
  //What should they be able to update?

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

exports.createPin = function(req, res) {
  let pinArray = []
  //Query user to pull pin array, push into array variable
  // User.find({ name: req.body.name}, function())

  //push req.body.pin into array variable

  //Update user field with pin array
}

exports.deletePin = function(req, res) {
  //Query user to pull pin array, find index of req.body.pin

  //splice req.body.pin out of pin array with index

  //Update user field with pin array
}

exports.createSpot = function(req, res) {
  //Query user to pull spot array, push into array variable

  //push req.body.spot into array variable

  //Update user field with spot array
}

exports.deleteSpot = function(req, res) {
  //Query user to pull spot array, find index of req.body.spot

  //splice req.body.spot out of spot array with index

  //Update user field with spot array
}
