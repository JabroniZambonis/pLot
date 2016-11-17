const mongoose = require('mongoose');
const User = require('../models/usersModel')
const db = require('../db.js')

exports.createUser = function(req, res) {
  new User({name: req.body.name,
    photo: req.body.photo,
    email: req.body.email,
    fbId: req.body.fbId,
    googleId: req.body.googleId})
      .save()
      .then(function(data) {
        res.status(201).send(data)
      })
      .catch(function(err) {
        console.log("ERROR, USER NOT CREATED: ", err)
      })
}

exports.getUser = function(req, res) {
  User.find({_id: req.params.userId}, function(err, result) {
    if (!err) res.status(201).send(result)
    else console.log("ERROR getUser: ", err)
  })
}

exports.updateUser = function(req, res) {

  User.findByIdAndUpdate(req.body._id,
    { email: req.body.email,
    photo: req.body.photo },
    function (err, result) {
      if (err) {
        console.log(err)
      }
      res.status(201).send(result);
  });
}

exports.createPin = function(req, res) {
  let pinArray = [] //setPin variable

  User.find({_id: req.body.userId}, function(err, result) { //Find user
    if (!err) pinArray = result.createdPins //set pinArray to existing
    else console.log("ERROR getUser: ", err)
  })

  pinArray.push(req.body.createdPin) //push in newly created Array

  findOneAndUpdate({ _id: req.body.userID }, {createdPins: pinArray}) //set pins attribute to pinArray
  //There should be a good way to refactor this rather than using
}

exports.deletePin = function(req, res) {
  let pinArray = [] //setPin variable

  User.find({_id: req.body.userId}, function(err, result) { //Find user
    if (!err) pinArray = result.createdPins //set pinArray to existing
    else console.log("ERROR getUser: ", err)
  })

  pinArray.splice((pinArray.indexOf(req.body.createdPin), 1))

  findOneAndUpdate({ _id: req.body.userID }, {createdPins: pinArray}) //set pins attribute to pinArray
  //There should be a good way to refactor this rather than using
}

exports.deleteSpot = function(req, res) {
  let spotArray = [] //setPin variable

  User.find({_id: req.body.userId}, function(err, result) { //Find user
    if (!err) spotArray = result.createdSpots //set pinArray to existing
    else console.log("ERROR getUser: ", err)
  })

  spotArray.splice((spotArray.indexOf(req.body.createdSpots), 1))

  findOneAndUpdate({ _id: req.body.userID }, {createdSpots: spotArray}) //set pins attribute to pinArray
  //There should be a good way to refactor this rather than using
}

exports.getSavedPins = function (req, res) {
  User.findById(req.params.userId)
    .populate('savedPins')
    .then(user => {
      // respond with users saved pins
      return res.status(200).json(user.savedPins)
    })
    .catch(err => res.status(500).json(err))
}

exports.getCreatedPins = function (req, res) {
  User.findById(req.params.userId)
    .populate('createdPins')
    .then(user => {
      // respond with created pins
      return res.status(200).json(user.createdPins)
    })
    .catch(err => res.status(500).json(err))
}