const mongoose = require('mongoose')
const Location = require('../Models/locations')
const db = require('../db')
const request = require('request-promise')

const baseGoogleURL = 
  `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_API_KEY}`

exports.create = function (req, res) {
  new Location({
    address: req.body.location.address,
    rating: 0,
    photos: [],
    description: req.body.location.description,
    loc: req.body.location.loc
  })
  .save()
  .then((data) => {
    console.log('Created location: ', data)
  })
  .catch((err) => {
    console.log('Location not saved: ',err)
  })
}

exports.searchGoogleByCoords = function(req, res) {
  const { lat, long } = req.query
  const searchURL = baseGoogleURL + `&latlng=${lat},${long}`
  request(searchURL)
    .then((response) => {
      const resultAddress = JSON.parse(response).results[0].formatted_address 
      console.log('result address:', resultAddress)
      res.status(200).json(resultAddress)
    })
    .catch((err) => {
      console.log('search error: ',err)
    })
}

exports.findByCoords = function (req, res) {

}

exports.findByAddr = function (req, res) {
  const { address } = req.query
  const query = baseGoogleURL + `&address=${address}`
  console.log(query)
  request(query)
    .then(function(response) {
      res.json(response.location)
    })
}

exports.photos = function (req, res) {

}

exports.addPhoto = function (req, res) {

}

exports.addReview = function (req, res) {

}
