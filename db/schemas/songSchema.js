const mongoose = require('mongoose')
const Schema = mongoose.Schema

const songSchema = new Schema ({
    name: String,
    artist: String,
    album: String,
    genre: String,
    albumImage: String
})

module.exports = songSchema