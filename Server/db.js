const mongoose = require('mongoose')
const db = mongoose.connect(
  `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`
)

module.exports = db