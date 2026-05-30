const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    try {

        // 1. get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            const error = new Error("No token provided");
            error.statusCode = 401;
            throw error;
        }

        // 2. format: Bearer TOKEN
        const token = authHeader.split(" ")[1];

        if (!token) {
            const error = new Error("Invalid token format");
            error.statusCode = 401;
            throw error;
        }

        // 3. verify token
        const decoded = jwt.verify(token, "secretKey123");

        // 4. attach user to request
        req.user = decoded;

        next();

    } catch (error) {
        next(error);
    }
};

module.exports = protect;