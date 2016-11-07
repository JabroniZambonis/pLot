const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const db = mongoose.connect(
  `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`
)

module.exports = db
