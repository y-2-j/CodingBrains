const mongoose=require('mongoose');

const submissionSchema =mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "problem"
    },
    code: String,   // To be stored as file later, currently as String in DB
    language: {
        type: String,
        enum: ["c", "cpp"]  // Allowed Languages
    },
    timeUsed: Number,
    memoryConsumed: Number,
    verdict: {
        type: String,
        enum: ["AC", "WA", "TLE", "RE"] // Depends on API Used
    }
});

module.exports= mongoose.model('submission', submissionSchema);