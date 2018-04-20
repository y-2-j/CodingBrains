const route = require("express").Router();

// Import DB Models required
const { Contest, User, Problem } = require("../models");
const { checkLoggedIn } = require("../utils/auth");

// GET Route for Create Page for contest
route.get("/new", (req, res) => {
    res.render("contest/new");
});

// POST Route to create new Contest
route.post("/", checkLoggedIn, async (req, res) => {
    try {
        // Extract required fields from Request Body
        const { name, startTime, duration, prizes } = req.body;

        // Create the contest
        const contest = await Contest.create({
            name, startTime, duration, prizes,
            organizer: req.user._id
        });

        // Redirect User to Upload Problems Page
        res.send(`/contests/${contest._id}/edit`);

    } catch (err) {
        console.error(err.stack);
        res.sendStatus(500);
    }
});

// GET Route for editing Contest Page
route.get("/:id/edit", checkLoggedIn, async (req, res) => {
    try {
        // Find the Contest
        const contest = await Contest.findById(req.params.id);

        // If not found, 404
        if (contest === null)
            return res.status(404).send("Contest Not found!");

        // Check if user is same as organizer
        if (contest.organizer.toString() !== req.user._id.toString())
            return res.status(401).send("You are not allowed to do so!");

        await Contest.populate(contest, "problems");
        console.log(contest);
        
        res.render("contest/edit", { contest });

    } catch (err) {
        console.error(err.stack);
        res.sendStatus(500);
    }
});

// GET Route to Add problem Page
route.get("/:id/problems/new", checkLoggedIn, async (req, res) => {
    try {
        // Find the contest
        const contest = await Contest.findById(req.params.id);
        // If not found, 404
        if (contest === null)
            return res.status(404).send("Contest Not found!");

        // Check if user is same as organizer
        if (contest.organizer.toString() !== req.user._id.toString())
            return res.status(401).send("You are not allowed to do so!");
        
        // render the new problem page to user
        res.render("problem/new", { contestId: contest._id });

    } catch (err) {
        console.error(err.stack);
        res.sendStatus(500);
    }
});

// POST Route to add new problem to a contest
route.post("/:id/problems", checkLoggedIn, async (req, res) => {
    try {
        // Find the contest
        const contest = await Contest.findById(req.params.id);

        // If not found, 404
        if (contest === null)
            return res.status(404).send("Contest Not found!");

        // Check if user is same as organizer
        if (contest.organizer.toString() !== req.user._id.toString())
            return res.status(401).send("You are not allowed to do so!");

        let { name, statement, sampleInput, sampleOutput, editorial, input, output, memoryLimit, timeLimit } = req.body;

        // Join Sample Input and Output
        statement += `
            <br>
            <b>Sample Input</b>
            <br>
            ${sampleOutput}
            <br>
            <b>Sample Input</b>
            <br>
            ${sampleOutput}
            <br>
        `
        const problem = await Problem.create({
            name, statement, editorial,
            contest: contest._id,
            testCases: [{ input, output }],
            memoryLimit, timeLimit,
            attempts: [],
            tags: [],
            accuracy: 100,
            numSuccessfulAttempts: 0
        });

        contest.problems.push(problem._id);
        await contest.save();

        res.redirect(`/contests/${contest._id}/edit`);

    } catch (err) {
        console.error(err.stack);
        res.sendStatus(500);
    }
});

//GET Route for fetching list of upcoming and live contests
route.get("/", async (req, res) => {
    try{
        const contests = await Contest.find()
                                      .gt("endTime", Date.now())
                                      .sort({ startTime: "ascending" });
        
        res.render("contests", { contests });

    }catch(err){
        console.error(err.stack);
        res.sendStatus(500);
    }
});

//GET Route for fetching details about a particular Contest
route.get("/:id", async (req,res)=>{
    try{
        const contest = await Contest.findById(req.params.id).populate("problems").populate("organizer");
        res.render("contest/index", { contest, contestStarted: contest.startTime <= Date.now() });

    }catch (err){
        console.error(err.stack);
        res.sendStatus(500);
    }
});

module.exports = route;