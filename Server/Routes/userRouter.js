const express = require('express')
const users = require('../Controllers/userCtrl')
const jwt = require('../Lib/jwt.js')

const router = express.Router()

const isAuthenticated = function(req, res, next) {
  const token = req.get("Authorization")

  const decoded = jwt.decode(token)

  if (typeof decoded === 'object') {
    console.log("token successfuly decoded: ", decoded)
    res.status(200)
    next()
  } else {
    console.log('ERROR, INCORRECT ACCESS TOKEN')
    res.status(400).end()
  }

}

router.use(isAuthenticated)

router.route('/')
  .post(users.createUser) //add user

router.route('/:userId')
  .get(users.getUser) //get user
  .put(users.updateUser) //update user information

router.route('/:userId/saved')
  .get(users.getSavedPins)
  .post(users.createPin) //add new pin
  .delete(users.deletePin) //delete pin

router.route('/:userId/created')
  .get(users.getCreatedPins)
  .delete(users.deleteSpot) //delete spot

module.exports = router
