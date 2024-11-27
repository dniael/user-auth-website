const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },

    email: {
        type: String,
        unique: true
    },

    password: String,

    resetPassToken: {
        type: String,
        unique: true
    },

    tokenExpireDate: Date
})

export const UserModel = mongoose.model('User', userSchema)