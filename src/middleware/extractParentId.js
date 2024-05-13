const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = process.env;

const extractParentId = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is sent in the Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Authorization token not provided' });
    }

    try {
        const decodedToken = jwt.verify(token, TOKEN_KEY);
        req.parentId = decodedToken.userId; // Assign parent ID to the request object
        next();
        console.log("Parent ID extracted:", req.parentId); // Log the extracted parent ID

    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = extractParentId;
