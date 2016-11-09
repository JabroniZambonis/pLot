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
  
  const { long, lat } = req.query
  
  Location.find().where('loc').near({ center: { coordinates: [long, lat], type: 'Point' }, maxDistance: 2000 })
  .then((locations) => {
    res.json(locations)
  })
}

exports.findByAddr = function (req, res) {
  const address = req.query.q
  const query = baseGoogleURL + `&address=${address}`
  request(query)
    .then(function(response) {

      const responseObj = JSON.parse(response).results[0]
      

      const long = responseObj.geometry.location.lng
      const lat = responseObj.geometry.location.lat

      Location.find().where('loc').near({ center: { coordinates: [long, lat], type: 'Point' }, maxDistance: 2 })
      .then((locations) => {

        const locationsAndCoords = {}
        locationsAndCoords.coords = [lat, long]
        locationsAndCoords.locations = locations

        res.json(locationsAndCoords)
      })    

    })
}

exports.photos = function (req, res) {

}

exports.addPhoto = function (req, res) {

}

exports.addReview = function (req, res) {

}
