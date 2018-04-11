const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../models/user')
const Playlist = require('../models/playlist')

//INDEX ROUTE
router.get('/', (req, res) => {
    User.findById(req.params.userId).then((user) => {
        const playlists= user.playlists
        res.json(playlists)
    }).catch(err => {
        console.log(err)
    })
})

//POST ROUTE
router.post('/', (req, res) => {
    const userId = req.params.userId
    const newPlaylist = req.body

    User.findById(userId).then((user) => {
        user.playlists.push(newPlaylist)
        return user.save()
    }).then((user) => {
        res.json(user)
    }).catch((err) => {
        console.log(err)
    })
})

//SHOW ROUTE
router.get('/:id', (req, res) => {
    const userId = req.params.userId
    const playlistId = req.params.id
    User.findById(userId).then((user) => {
        const playlist = user.playlists.id(playlistId)
        res.json(playlist)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

//UPDATE ROUTE
router.patch('/:id', (req, res) => {
    const userId = req.params.userId
    const playlistId = req.params.id
    const updatedPlaylist = req.body
    User.findByIdAndUpdate(userId).then((user) => {
        const playlistToUpdate = user.playlists.id(playlistId)
        playlistToUpdate.name = updatedPlaylist.name
        playlistToUpdate.description = updatedPlaylist.description
        return user.save()
    }).then((user) => {
        res.json(user.playlists.id(playlistId))
    }).catch((err) => {
        console.log(err)
    })
})

router.delete('/:id', (req, res) => {
    const userId = req.params.userId
    const playlistId = req.params.id
    User.findById(userId)
    .then((user) => {
        const playlist = user.playlists.id(playlistId).remove()
        return user.save()
    }).then(() => {
        res.redirect(`/api/users/${userId}/playlists`)
    }).catch((err) => {
        console.log(err)
        res.json(err)
    })
})

module.exports = router