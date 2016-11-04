const express = require('express')
const router = express.Router()
const locations = require('../Controllers/locationCtrl')

router.route('/')
  .post(locations.create)

router.route('/:locationId/bycoords')
  .get(locations.ifndByCoords)

router.route('/:locationId/byaddr')
  .get(locations.findByAddr)

router.route('/:locationId/photos')
  .get(locations.photos)
  .post(locations.addPhoto)

router.route('/:locationId/reviews')
  .post(locations.addReview)

module.exports = router
