require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/user')
const Playlist = require('../models/playlist')
const Song = require('../models/song')

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on('open', () => {
    console.log('You have connected to mongoDB!')
})
db.on('error', (err) => {
    console.log(err)
})

const testSong = new Song ({
    name: 'Nothing Feels Good',
    artist: 'The Promise Ring',
    album: 'Nothing Feels Good',
    genre: 'Emo',
    albumImage: 'https://upload.wikimedia.org/wikipedia/en/8/89/Nothing_feels_good.jpg'
})

const testSongTwo = new Song ({
    name: 'Is This Thing On?',
    artist: 'The Promise Ring',
    album: 'Nothing Feels Good',
    genre: 'Emo',
    albumImage: 'https://upload.wikimedia.org/wikipedia/en/8/89/Nothing_feels_good.jpg'
})

const testPlaylist = new Playlist({
    name: "first playlist",
    description: "this is a test playlist",
    songs: [testSong, testSongTwo]
})

const cam = new User({
    username: "cameron",
    image: "https://scontent.fatl1-1.fna.fbcdn.net/v/t1.0-9/26220209_10157358172968636_4717839910466707427_n.jpg?oh=f1f9558595efab67894a84e70afbbd9c&oe=5B4460F2",
    location: "Atlanta",
    playlists: [testPlaylist]
})

User.remove(() => {
    return User.remove()
}).then(() => {
    return cam.save()
}).then(() => {
    console.log('saved successfully!')
}).catch((err) => {
    console.log(err)
    db.close()
})