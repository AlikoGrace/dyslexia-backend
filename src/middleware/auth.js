const jwt = require("jsonwebtoken");
const User = require('../../src/domains/user/model'); // Ensure the User model is imported

const { TOKEN_KEY } = process.env;

const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    console.log("Received token:", token); // Add this line

    // Checking for provided token
    if (!token) {
        return res.status(403).send("An authentication token is required");
    }

    try {
        // Verify token
        const decodedToken = await jwt.verify(token, TOKEN_KEY);

        // Find the user based on the decoded token
        const user = await User.findById(decodedToken.userId);

        if (!user) {
            return res.status(401).send('User not found');
        }

        // Set the current user in the request
        req.currentUser = user;
        console.log("Current User:", req.currentUser); // Add this line


    } catch (error) {
        return res.status(401).send('Invalid Token provided');
    }

    return next();
}

module.exports = verifyToken;
