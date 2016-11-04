const express = require('express')
counst router = express.Router()
const users = require('/Controllers/userCtrl')

router.get('/', users.home)

router.get('/userId', users.userId)

router.put('/userId', users.userId)

router.post('/userId/saved', users.saved)

router.delete('/userId/saved', users.saved)

router.post('/userId/created', users.created)

router.delete('/userId/created', users.created)

module.exports = router
