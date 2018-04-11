// Create Express Router
const route = require("express").Router();
// Passport
const Passport = require("passport");

const { User } = require("../models");

// POST Route for Signup
route.post('/signup', async (req, res, next) => {
    try {
        const { username, password, name, email } = req.body;

        // Check if user already exists
        const user = await User.findOne({ username });
        if (user !== null){
           return res.status(409).send("Username already taken!");
        }
        const newUser= await User.create({ username, password, name, email });

        // Log the user in
        Passport.authenticate('local', {
            successRedirect:'/',
            failureRedirect: '/'
        })(req, res, next);

    } catch (err) {
        console.error(err.stack);
        res.sendStatus(500);
    }
});

// POST Route for Login
route.post('/login', Passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect: '/'
}));

route.get("/try", (req, res) => console.log(req.user));

// GET Route for Logout
route.get('/logout', (req, res)=>{
    req.logOut();
    res.redirect('/');
});


module.exports = route;