// Create Express Router
const route = require("express").Router();

// Require all SubRoutes


// Use all Subroutes on the route
route.use("/", require("./auth"));


// Export the Router
module.exports = route;