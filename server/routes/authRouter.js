const router = require('express').Router()
const authCtrl = require('../controllers/authController')

router.route('/')
  .post(authCtrl.fbAuthenticate)

router.route('/login')
  .get(authCtrl.login)

module.exports = router
