const { resolve } = require('path')
const formidable = require('formidable')

module.exports = function (req, res, next) {
  const form = new formidable.IncomingForm()
  form.uploadDir = resolve(__dirname, '../', 'uploads')
  let image
  form
    .on('file', function (name, file) {
      // make sure it is an image
      if (file.type === 'image/jpeg') {
        image = file
      }
    })

    .on('error', function (err) {
      res.status(500).json(err)
    })

    .on('end', function () {
      req.image = image
      next()
    })
  form.parse(req)
}