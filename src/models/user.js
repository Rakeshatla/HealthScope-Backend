const { timeStamp } = require('console');
const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        minLength: 5,
    },
    LastName: {
        type: String
    },
    emailId: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        minLength: 8
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
}, { timeStamp: true })
module.exports = mongoose.model('User', userSchema);