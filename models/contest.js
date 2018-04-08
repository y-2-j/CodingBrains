const mongoose = require('mongoose');

const contestSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    name: String,
    startTime: Date,
    duration: Number,   // Duration in Hours
    problems:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "problem"
    }],
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    prizes: [String]
});

module.exports = mongoose.model('contest', contestSchema);