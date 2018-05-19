// Require Necessary Packages
const express = require("express");
const path = require("path");
const cp = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// User Defined Files
const CONFIG = require("./config");
// Require Routes
const routes = require("./routes");

// Require mongoDB connection
const db = require('./db');
// Passport Local Strategy
const Passport = require("./passport");


// INITIALIZATION
// Initialize Express App
const app = express();


// Use ejs as templating engine
app.set("view engine", "ejs");

// MIDDLEWARES
// Parse Request Bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Cookie Parser
app.use(cp(CONFIG.COOKIE_SECRET));

// Express Session for passport and connect-mongo
app.use(session({
	secret: CONFIG.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	store: new MongoStore({ mongooseConnection: db.connection })
}));

// Initialize Passport
app.use(Passport.initialize());
app.use(Passport.session());




// Serve static Files
app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));

// Add User to every response's locals
app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});

// ROUTES
app.use("/", routes);


// Listen at PORT specified in CONFIG
app.listen(CONFIG.SERVER.PORT, () => {
	console.log(`Server started at http://${CONFIG.SERVER.HOST}:${CONFIG.SERVER.PORT}/`);
});
