// Import Required Packages
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Import DB Models Required
const { User } = require("./models");


// Serialize User with Username
passport.serializeUser((user, done) => done(null, user.username));

// Deserialize user from username
passport.deserializeUser(async (username, done) => {
    try {
        // Find the user
        const user = await User.findOne({ username });
        // Call done with the User
        done(null, user);

    } catch (err) {
        console.error(err.stack);
        done(err);
    }
});


// Create Local Strategy
const localStrategy = new LocalStrategy(async (username, password, done) => {
    try {
        // Find the user
        const user = await User.findOne({ username });

        // If User not found
        if (user === null)
            return done(null, false, { message: "User not found!" });
        
        // Check User's Password
        // If password does not match
        if (user.password !== password)
            return done(null, false, { message: "Wrong Password!" });
        
        // else, Login Successful!
        return done(null, user);

    } catch (err) {
        console.error(err.stack);
        done(err);
    }
});

// Use local strategy at 'local'
passport.use("local", localStrategy);


// Export passport
module.exports = passport;