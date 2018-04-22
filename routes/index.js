// Create Express Router
const route = require("express").Router();

// Render index Page on Root Route
route.get("/", (req, res) => res.render("index"));

// Use all Subroutes on the route
route.use("/", require("./auth"));
route.use("/contests", require("./contest"));


// Export the Router
module.exports = route;