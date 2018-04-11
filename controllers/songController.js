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

//POST ROUTE
router.post('/', (req, res) => {
    const userId = req.params.userId
    const playlistId = req.params.playlistId
    const newSong = req.body

    User.findById(userId)
    .then(user => {
        const playlist = user.playlists.id(playlistId)
        playlist.songs.push(newSong)
        return user.save()
    })
    .then(user => {
        res.json(user.playlists.id(playlistId).songs)
    })
    .catch(err => {
        console.log(err)
    })
})

//SHOW ROUTE
router.get('/:id', (req, res) => {
    const userId = req.params.userId
    const playlistId = req.params.playlistId
    const songId = req.params.id
    User.findById(userId)
    .then(user => {
        const song = user.playlists.id(playlistId).songs.id(songId)
        res.json(song)
    })
    .catch(err => {
        console.log(err)
        res.json(err)
    })
})

//UPDATE ROUTE
router.patch('/:id', (req, res) => {
    const userId = req.params.userId
    const playlistId = req.params.playlistId
    const songId = req.params.id
    const updatedSong = req.body
    User.findByIdAndUpdate(userId)
    .then(user => {
        const songToUpdate = user.playlists.id(playlistId).songs.id(songId)
        songToUpdate.name = updatedSong.name
        songToUpdate.artist = updatedSong.artist
        songToUpdate.album = updatedSong.album
        songToUpdate.genre = updatedSong.genre
        songToUpdate.albumImage = updatedSong.albumImage
        return user.save()
    }).then((user) => {
        res.json(user.playlists.id(playlistId).songs.id(songId))
    })
    .catch(err => {
        console.log(err)
        res.json(err)
    })
})

//DELETE ROUTE
router.delete('/:id', (req, res) => {
    const userId = req.params.userId
    const playlistId = req.params.playlistId
    const songId = req.params.id
    User.findById(userId)
    .then((user) => {
        const song = user.playlists.id(playlistId).songs.id(songId).remove()
        return user.save()
    }).then(() => {
        res.redirect(`/api/users/${userId}/playlists/${playlistId}/songs`)
    }).catch((err) => {
        console.log(err)
        res.json(err)
    })
})


module.exports = router