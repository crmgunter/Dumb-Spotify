const mongoose = require('mongoose')
const Schema = mongoose.Schema
const songSchema = require('./songSchema')

const playlistSchema = new Schema ({
    name: String,
    description: String,
    songs: [songSchema]
})

module.exports = playlistSchema