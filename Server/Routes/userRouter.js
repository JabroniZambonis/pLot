const express = require('express')
counst router = express.Router()
const users = require('/Controllers/userCtrl')

router.get('/', users.home)

router.get('/userId', users.userId)

router.get('/userId/saved', users.saved)

router.get('/userId/saved', users.created)

module.exports = router
