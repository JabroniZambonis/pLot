const express = require('express')
const router = express.Router()
const locations = require('../controllers/locationCtrl')

router.route('/')
  .post(locations.create)


router.route('/bycoords')
  .get(locations.findByCoords)

router.route('/googlebycoords')
  .get(locations.searchGoogleByCoords)

router.route('/parkwhizbycoords')
  .get(locations.searchParkWhizByCoords)

router.route('/byaddr')
  .get(locations.findByAddr)

router.route('/:locationId')
  .get(locations.getLocation)

router.route('/:locationId/photos')
  .get(locations.photos)
  .post(locations.addPhoto)

router.route('/:locationId/reviews')
  .get(locations.getReviews)
  .post(locations.addReview)

module.exports = router
