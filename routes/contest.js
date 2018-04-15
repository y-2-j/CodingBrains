const route = require("express").Router();

// Import DB Models required
const { Contest } = require("../models");
const { checkLoggedIn } = require("../utils/auth");

// GET Route for Create Page for contest
route.get("/new", (req, res) => {
    res.render("contest/new");
});

// POST Route to create new Contest
route.post("/", checkLoggedIn, async (req, res) => {
    try {
        // Extract required fields from Request Body
        const { name, startTime, duration } = req.body;

        // Create the contest
        const contest = await Contest.create({
            name, startTime, duration,
            organizer: req.user._id
        });

        // Redirect User to Upload Problems Page
        res.redirect(`/contests/${contest._id}/problems/new`);

    } catch (err) {
        console.error(err.stack);
        res.sendStatus(500);
    }
});

module.exports = route;