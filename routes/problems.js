const route = require("express").Router();

// Import DB Models required
const { Problem } = require("../models");

// GET Route for a Problem
route.get("/:id", async (req, res) => {
    try {
        // Get the Problem with contest
        const problem = await Problem.findById(req.params.id).populate("contest");
        // Check if Contest has started
        if (problem.contest.startTime > Date.now())
            return res.status(404).send("Problem not found!");
        
        // else, Render the Problem Page
        res.render("problem", { problem, loggedIn: !!req.user });

    } catch (err) {
        console.error(err.stack);
        res.sendStatus(500);
    }
});

// GET Route for Editorial of a Problem
route.get("/:id/editorial", async (req, res) => {
    try {
        // Get Problem with contest
        const problem = await Problem.findById(req.params.id).populate("contest");
        // Check if Contest Statrted
        if (problem.contest.startTime > Date.now())
            return res.status(404).send("Problem not found!");

        // Render the Editorial of the Problem
        res.render("problem/editorial", { problem });

    } catch (err) {
        console.error(err.stack);
        res.sendStatus(500);
    }
});

module.exports = route;