const mongoose = require('mongoose')
const playlistSchema = require('../db/schemas/playlistSchema')

const Playlist = mongoose.model('playlist', playlistSchema)

module.exports = Playlist