const mongoose = require('mongoose')
const Schema = mongoose.Schema
const playlistScehma = require('./playlistSchema')
const userSchema = new Schema ({
    username: String,
    image: String,
    location: String,
    id: String,
    playlists: [playlistScehma]
})

module.exports = userSchema