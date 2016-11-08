const express = require('express')
const router = express.Router()
const locations = require('../Controllers/locationCtrl')

router.route('/')
  .post(locations.create)

router.route('/bycoords')
  .get(locations.findByCoords)

router.route('/latlong')
  .get(locations.searchGoogleByCoords)

router.route('/byaddr')
  .get(locations.findByAddr)

router.route('/:locationId/photos')
  .get(locations.photos)
  .post(locations.addPhoto)

router.route('/:locationId/reviews')
  .post(locations.addReview)

module.exports = router
