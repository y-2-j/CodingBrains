// Create Express Router
const route = require("express").Router();

// Require all SubRoutes


// Use all Subroutes on the route
route.use("/", require("./auth"));
route.use("/contests", require("./contest"));
route.use("/problems", require("./problems"));


// Export the Router
module.exports = route;