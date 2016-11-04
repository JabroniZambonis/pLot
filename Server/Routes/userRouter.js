const express = require('express')
counst router = express.Router()
const users = require('/Controllers/userCtrl')

router.post('/', users.createUser) //add user

router.get('/userId', users.getUser) //get user

router.put('/userId', users.updateUser) //update user information

router.post('/userId/saved', users.createPin) //add new pin

router.delete('/userId/saved', users.deletePin) //delete pin

router.post('/userId/created', users.createSpot) //add new spot

router.delete('/userId/created', users.deleteSpot) //delete spot

module.exports = router
