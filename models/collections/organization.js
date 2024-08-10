const mongoose = require('mongoose');

const organizationSchema = mongoose.Schema({
    organizationName: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
    },
    email: {
        type: String,
        required: true
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
module.exports = new mongoose.model('organizations', organizationSchema);