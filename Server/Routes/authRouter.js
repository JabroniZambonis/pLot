const router = require('express').Router()
const authCtrl = require('../Controllers/authController')
router.route('/')
  .post(authCtrl.loginUser)

module.exports = router
