module.exports = {
    // Checks if User is logged in
    checkLoggedIn: (req, res, next) => {
        if (req.user) {
            return next();
        }
        res.sendStatus(401).send("You must be logged in to do that!!");
    }
}