// Require Necessary Packages
const express = require("express");

// User Defined Files
const CONFIG = require("./config");
// Require Routes
const routes = require("./routes");


// INITIALIZATION
// Initialize Express App
const app = express();


// Serve static Files
app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));


// ROUTES
app.use("/", routes);


// Listen at PORT specified in CONFIG
app.listen(CONFIG.SERVER.PORT, () => {
	console.log(`Server started at http://${CONFIG.SERVER.HOST}:${CONFIG.SERVER.PORT}/`);
});
