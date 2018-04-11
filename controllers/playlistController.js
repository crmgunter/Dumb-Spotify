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
    
})

module.exports = router