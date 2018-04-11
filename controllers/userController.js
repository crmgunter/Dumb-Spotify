const express = require('express')
const router = express.Router()
const User = require('../models/user')
//GET ROUTE
router.get('/', (req, res) => {
    User.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        console.log(err)
    })
})
//POST ROUTE
router.post('/', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        image: req.body.image,
        location: req.body.location
    })
    newUser.save().then(savedUser => {
        res.redirect(`/api/users`)
    })
})
// SHOW ROUTE
router.get('/:id', (req, res) => {
    const userId = req.params.id
    const user = User.findById(userId).then((user) => {
        res.json(user)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

module.exports = router