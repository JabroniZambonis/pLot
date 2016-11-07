const router = require('express').Router()
const request = require('request-promise')
const fbUrl = "https://graph.facebook.com/v2.8/me"

router.route('/')
  .post(function(req, res) {
    const fbAccessToken = "EAAWBgvpJAdEBAGX9g0Y2gxY6hTtny64Q3i0bpYQiZAOLqZCgvzUGOZCK9UyhBU78MUaqgs9ZBAqafe17UBRR61yqKuvfO5kjVjRsJd7h99O2CS8U0PlLOOnOfSi7vnTZCp1GqjGnk9r1w6fjXOrsE3Rpt4v7P0cOb9d8dTZC5KAZCyE2DpalQQxB1fHbEBy6sDPXNPq4Bld6ckzxBdZBw0FVs6ZCwg6HvRfwZD"
    // validate the access token with facebook
    request(requestOptions)
      .then(console.log)
  })

module.exports = router
