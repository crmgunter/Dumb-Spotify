const mongoose = require('mongoose')
const userSchema = require('../db/schemas/userSchema')

const User = mongoose.model('user', userSchema)

model.exports = User