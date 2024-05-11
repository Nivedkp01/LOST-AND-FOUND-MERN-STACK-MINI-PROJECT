const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    feedback: {
        type: String,

    },
    username: {
        type: String,

    }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
