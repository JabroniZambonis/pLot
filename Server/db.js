const mongoose = require('mongoose')
mongoose.Promise = global.Promise

let dbUrl = process.env.NODE_ENV === 'production' 
  ? process.env.DB_DEPLOYED
  : process.env.DB_HOST 

const db = mongoose.connect(
  `mongodb://${dbUrl}/${process.env.DB_NAME}`
)

module.exports = db
