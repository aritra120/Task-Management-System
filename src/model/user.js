const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    taskOwner: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    created: {
        type: Date
    }
});
const user = new mongoose.model('User', schema);
module.exports = user;