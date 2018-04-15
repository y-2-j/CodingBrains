const route = require("express").Router();

// Import DB Models required
const { Contest, User } = require("../models");
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
        res.send(`/contests/${contest._id}/problems/new`);

    } catch (err) {
        console.error(err.stack);
        res.sendStatus(500);
    }
});

//GET Route for fetching list of upcoming and live contests
route.get("/", async (req, res) => {
    try{
        const contests = await Contest.find({
            startTime:{$gte: Date.now()}
        })
            .sort({startTime: 1});
        res.render("contests", { contests });

    }catch(err){
        console.error(err.stack);
        res.sendStatus(500);
    }
});

//GET Route for fetching details about a particular Contest
route.get("/:id", async (req,res)=>{
    try{
        const contest = await Contest.findById(req.params.id).populate("problems organizer");
        res.render("contest/index", { contest });

    }catch (err){
        console.error(err.stack);
        res.sendStatus(500);
    }
});

module.exports = route;