const mongoose=require('mongoose');

const problemSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    contest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contest"
    },
    name: String,
    statement: String,
    editorial: String,
    testCases: [{
        // Store in File later, currently as String in DB
        input: String,
        output: String
    }],
    memoryLimit: Number,
    timeLimit: Number,
    attempts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Submission"
    }],
    tags: [String],
    accuracy: Number,
    numSuccessfulAttempts: Number
});

module.exports = mongoose.model('problem', problemSchema);