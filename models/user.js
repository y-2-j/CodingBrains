const mongoose=require('mongoose');

const userSchema =mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    name: String,
    contestsGiven: [{
        contestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "contest"
        },
        rank: Number,
        score: Number
    }],
    submissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "submission"
    }],
    rating: Number,
    contestsOrganized: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "contest"
    }]
});

module.exports= mongoose.model('user', userSchema);