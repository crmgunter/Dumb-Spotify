const mongoose = require('mongoose')
const songSchema = require('../db/schemas/songSchema')

const Song = mongoose.model('song', songSchema)

module.exports = Song