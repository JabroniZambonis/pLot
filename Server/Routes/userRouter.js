const express = require('express')
counst router = express.Router()
const userCtrl = require('/Controllers/userCtrl')

router.get('/', userCtrl.home)

router.get('/userId', userCtrl.userId)

router.get('/userId/saved', userCtrl.saved)

router.get('/userId/saved', userCtrl.created)

module.exports = router
