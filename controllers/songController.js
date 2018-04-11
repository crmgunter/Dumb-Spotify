const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../models/user')
const Playlist = require('../models/playlist')
const Song = require('../models/song')

//INDEX ROUTE
router.get('/', (req, res) => {
    const userId = req.params.userId
    const playlistId = req.params.playlistId
    User.findById(userId)
    .then(user => {
        const playlist = user.playlists.id(playlistId)
        res.json(playlist.songs)
    })
    .catch(err => {
        console.log(err)
    })
})


module.exports = router