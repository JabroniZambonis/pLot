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
  // if lat and long aren't provided send error
  if (!lat || !long) {
    const err = {
      error: 'Route requires a lat and long query parameter, e.g: \'locations/googlebycoords?long=-97.7405441&lat=30.2689941\''
    }
    return res.status(400).json(err)
  }
  // lat and long query params exist
  // build up query
  const searchURL = baseGoogleURL + `&latlng=${lat},${long}`
  request(searchURL)
    .then((response) => {
      const resultAddress = JSON.parse(response).results[0].formatted_address
      return res.status(200).json(resultAddress)
    })
    .catch((err) => {
      console.log('search error: ', err)
    })
}

exports.searchParkWhizByCoords = function(req, res) {
  let startTime = Math.round(+new Date()/1000 - 10000)
  let endTime = Math.round((+new Date()/1000) + 10000)
  const { lat, long } = req.query
  // if lat and long aren't provided send error
  if (!lat || !long) {
    const err = {
      error: 'Route requires a lat and long query parameter, e.g: \'locations/googlebycoords?long=-97.7405441&lat=30.2689941\''
    }
    return res.status(400).json(err)
  }
  // lat and long query params exist
  // build up query
  request(`https://api.parkwhiz.com/search/?lat=${lat}&lng=${long}&start=${startTime}&end=${endTime}&key=${process.env.PARKWHIZ_API_KEY}`)
    .then((response) => {
      const resultAddress = JSON.parse(response).results[0].formatted_address
      return res.status(200).json(resultAddress)
    })
    .catch((err) => {
      console.log('search error: ', err)
    })
}

exports.findByCoords = function (req, res) {
  const { long, lat } = req.query
  // if no long or lat was given send an error message
  if (!lat || !long) {
    const err = {
      error: 'Route requires a lat and long query parameter, e.g: \'locations/bycoords?long=-97.7405441&lat=30.2689941\''
    }
    return res.status(400).json(err)
  }
  Location.find()
    .where('loc')
    .near(
      { center: { coordinates: [long, lat], type: 'Point' }, 
      maxDistance: 2000 }
    )
  .then((locations) => {
    return res.status(200).json(locations)
  })
  // error querying for locations
  .catch(err => res.status(500).json(err))
}

exports.findByAddr = function (req, res) {
  const address = req.query.q
  // if a query address is not provided route will fail
  if (!address) {
    const err = {
      error: 'Route requires a query parameter q pointing to an address. E.G: \'locations/byaddr?address=1060 W Addison St, Chicago, IL 60613\''
    }
    return res.status(400).json(err)
  }
  // address was provided for query
  const query = baseGoogleURL + `&address=${address}`
  request(query)
    .then(function(response) {

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

          res.status(200).json(locationsAndCoords)
        })
        // error finding location
        .catch(err => res.status(500).json(err))   
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
    userId: req.body.review.userId
  }

  console.log('1: ',review)
  Location.findOneAndUpdate(
    {_id: req.body.review.locationId},
    { $push: { reviews: review } },
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
