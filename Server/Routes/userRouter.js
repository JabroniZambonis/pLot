const express = require('express')
counst router = express.Router()
const userCtrl = require('/controller/userCtrl')

router.get('/', userCtrl.home)

router.get()

module.exports = router
