const mongoose = require('mongoose')
const Location = require('../Models/locations')
const db = require('../db')
const request = require('request-promise')
const User = require('../Models/usersModel')
const jwt = require('../Lib/jwt')

const baseGoogleURL = 
  `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_API_KEY}`

exports.create = function (req, res) {
  new Location({
    address: req.body.location.address,
    reviews: [],
    rating: 0,
    photos: [],
    description: req.body.location.description,
    loc: req.body.location.loc
  })
  .save()
  .then((location) => {
    // on location saved add it to users created pins
    // grab user from Authorization header
    const user = jwt.decode(req.get('Authorization'))
    User.findOneAndUpdate(
      { _id: user._id },
      { $push: { createdPins: location._id } },
      // return new updated user
      { new: true}
    )
    .then(user => {
      // user was saved send location to client to show write went through
      return res.status(201).json(location)
    })
  })
  // any errors trying to save location
  .catch((err) => {
    return res.status(500).json(err)
  })
}

exports.searchGoogleByCoords = function(req, res) {
  const { lat, long } = req.query
  const searchURL = baseGoogleURL + `&latlng=${lat},${long}`
  request(searchURL)
    .then((response) => {
      const resultAddress = JSON.parse(response).results[0].formatted_address
      res.status(200).json(resultAddress)
    })
    .catch((err) => {
      console.log('search error: ',err)
    })
}

exports.findByCoords = function (req, res) {
  const { long, lat } = req.query
  Location.find().where('loc').near({ center: { coordinates: [long, lat], type: 'Point' }, maxDistance: 2000 })
  .then((locations) => {
    res.status(200).json(locations)
  })
}

exports.findByAddr = function (req, res) {
  const address = req.query.q
  const query = baseGoogleURL + `&address=${address}`
  request(query)
    .then(function(response) {
      console.log('got here',response)

      let locationsAndCoords = {}
      // TODO: handle case where there are no results
      if (JSON.parse(response).status === "ZERO_RESULTS") {
        res.json(locationsAndCoords)
      } else {

        const responseObj = JSON.parse(response).results[0]
        
        const long = responseObj.geometry.location.lng
        const lat = responseObj.geometry.location.lat

        Location.find().where('loc').near({ center: { coordinates: [long, lat], type: 'Point' }, maxDistance: 2000 })
        .then((locations) => {

          locationsAndCoords.coords = [lat, long]
          locationsAndCoords.locations = locations

          res.json(locationsAndCoords)
        })    
      }
    })
}

exports.photos = function (req, res) {

}

exports.addPhoto = function (req, res) {

}

exports.addReview = function (req, res) {
 
  let review = {
    rating: req.body.review.rating,
    content: req.body.review.content,
    userId: req.body.review.content
  }

  console.log('1: ',review)
  Location.findOneAndUpdate(
    {_id: req.body.review.locaiontId},
    { $push: { "reviews": review } },
    { new: true}
  )
  .then(response => {
    console.log('success', response)
      return res.status(201).json(response)
  })
  .catch((err) => {
    return res.status(500).json(err)
  })
}
