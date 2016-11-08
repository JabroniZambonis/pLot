require('../db')
const request = require('request-promise')
const baseGoogleURL = 
  `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_API_KEY}`

exports.create = function (req, res) {
  const searchURL = baseGoogleURL + `&latlng=${req.body.lat},${req.body.long}`
  request(searchURL)
    .then((response) => {
      console.log(response.results[0].formatted_address)
      res.json(response.results[0].formatted_address)
    })
    .catch((err) => {
      console.log('create location error: ',err)
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
