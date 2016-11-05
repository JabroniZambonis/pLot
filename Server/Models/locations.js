const mongoose = require('mongoose')
const { Schema } = mongoose

const locationSchema = new Schema({
  address: { type: String, unique: true, required: true },
  rating: Number,
  photos: [],
  description: String,
  loc: { type: [Number], index: { type: '2dsphere' } }
})

const Location = mongoose.model('Location', locationSchema)
module.exports = Location
