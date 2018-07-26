const mongoose = require('mongoose');

const contestSchema = mongoose.Schema({
    name: String,
    startTime: Date,
    endTime: Date,
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

contestSchema.pre("save", function(next) {
    this.endTime = new Date(this.startTime).getTime() + this.duration*60*60*1000;
    next();
});

module.exports = mongoose.model('contest', contestSchema);