const router = require('express').Router()
const request = require('request-promise')
const jwt = require('../lib/jwt')
const User = require('../Models/usersModel')
const fb = "https://graph.facebook.com/v2.8/me?fields=id,name,email,picture"

router.route('/')
  .post(function(req, res) {
    // validate the access token with facebook
    request(fb + '&access_token=' + req.body.fbAccessToken)
      .then(function (response) {
        // on response turn into json
        const json = JSON.parse(response)
        new User({
          name: json.name,
          email: json.email,
          fbId: json.id,
          photo: json.picture.data.url
        }).save()
        .then(function (user) {
          // user was successfully saved
          // respond with jwt access_token
          const token = jwt.create(user)
          res.status(200).json(token)
        })
        .catch(function (err) {
          // if error code 11000 then that means duplicate key
          // in that case just update the users access token
          if (err.code === 11000) {
            // update the users access token
            res.send('something')
          } else {
            res.status(500).json(err)
          }
        })
      }) 
  })

module.exports = router
