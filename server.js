require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const userController = require('./controllers/userController')
const playlistController = require('./controllers/playlistController')
const songController = require('./controllers/songController')
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on('error', err => {
    console.log(err)
})

db.on('open', () => {
    console.log('Connected to MongoDB')
})

app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/api/users', userController)
app.use('/api/users/:userId/playlists', playlistController)
app.use('/api/users/:userId/playlists/:playlistId/songs', songController)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`App is up and runing on port ${PORT}`)
})