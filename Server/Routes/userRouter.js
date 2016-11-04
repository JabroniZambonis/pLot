const express = require('express')
counst router = express.Router()
const users = require('/Controllers/userCtrl')

router.route('/')
  .post(users.createUser) //add user

router.route('/userId')
  .get(users.getUser) //get user

router.route('/userId')
  .put(users.updateUser) //update user information

router.route('/userId/saved')
  .post(users.createPin) //add new pin

router.route('/userId/saved')
  .delete(users.deletePin) //delete pin

router.route('/userId/created')
  .post(users.createSpot) //add new spot

router.route('/userId/created') 
  .delete(users.deleteSpot) //delete spot

module.exports = router
