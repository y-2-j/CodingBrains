// Connect to database
const CONFIG =require('./config');
const mongoose =require('mongoose');

// Import all DB models
const { User, Problem, Contest } = require("./models");

// Import required utilities
const lorem = require("./utils/lorem");
const { randomNum } = require("./utils/random");


// Connect to Database
mongoose.connect(`mongodb://${CONFIG.DB.USERNAME}:${CONFIG.DB.PASSWORD}@${CONFIG.DB.HOST}:${CONFIG.DB.PORT}/${CONFIG.DB.NAME}`)
    .then(() => clearDB())
    .then(() => seedDatabase())
    .then(() => mongoose.connection.close())
    .catch(err => {
        console.error("Error while connecting to Database!", err.stack);
        mongoose.connection.close();
    });



// Function to Clear the Database to get it ready for seeding
const clearDB = () => {
    return Promise.all([User.remove(), Problem.remove(), Contest.remove()])
                  .catch(err => console.error("Error Clearing the Database: ", err.stack));
};


// Function to seed the Database creating a user with 3 contests, each with 5 problems
const seedDatabase = async () => {
    try {
        // Create 1 user: User
        const user = await User.create({
            username: "User",
            email: "user@gmail.com",
            password: "User",
            name: "User"
        });

        // Create 3 Contests with the User with 5 problems in each contest
        const contests = await Promise.all([
            createContestAndProblems(1, 5, user, Date.now() - 10*60*60*1000, 5),
            createContestAndProblems(2, 5, user, Date.now() - 2*60*60*1000, 5),
            createContestAndProblems(3, 5, user, Date.now() + 10*60*60*1000, 5)
        ]);

        // Add the Contests to user's organizedContests
        user.contestsOrganized.push(...contests);
        await user.save();

    } catch (err) {
        console.error("Error seeding the Database: ", err.stack);
    }
};

// Function to create a contest with specified fields, and create problems in it
const createContestAndProblems = async (contestNum, numProblems, organizer, startTime, duration = 5) => {
    try {
        // Create the Contest
        const contest = await Contest.create({
            name: `Contest ${lorem.words(2)}`,
            startTime,
            duration,
            organizer: organizer._id,
            prizes: [lorem.words(2), lorem.words(2)]
        });

        // Create the problems
        const promises = [];
        for (let i = 0; i < numProblems; ++i) {
            promises.push(createProblem(contest));
        }
        const problems = await Promise.all(promises);

        // Add the Problems to the contest
        contest.problems.push(...problems);
        await contest.save();

    } catch (err) {
        console.error("Error creating Contest", err.stack);
    }
}

// Function to create a problem in the specified contest
const createProblem = (contest) => {
    return Problem.create({
        contest,
        name: `Problem ${lorem.words(2)}`,
        statement: lorem.paragraph(),
        editorial: lorem.paragraph(),
        sampleInput: "Sample Input",
        sampleOutput: "Sample Output",
        testCases: [{ input: lorem.paragraph(), output: lorem.paragraph() }],
        memoryLimit: 256,
        timeLimit: randomNum(1, 5, 0.01),
        accuracy: randomNum(0, 100, 0.1),
        numSuccessfulAttempts: 0
    })
    .catch(err => console.error("Error creating Problem:", err.stack));
};