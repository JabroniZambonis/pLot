const router = require('express').Router()

router.route('/')
  .post(function(req, res) {
    const { fbAccessToken } = req.body
    // validate the access token with facebook
  })
