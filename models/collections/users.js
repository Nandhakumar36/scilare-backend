const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    userType: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

});
module.exports = new mongoose.model('users', userSchema);