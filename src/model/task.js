const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    taskId: {
        type: String,
        unique: true
    },
    userId: {
        type: String
    },
    heading: {
        type: String
    },
    details: {
        type: String,
        default: ''
    },
    tag: {
        type: String,
        default: ''
    },
    created: {
        type: Date
    }
});
const task = new mongoose.model('Task', schema);
module.exports = task;