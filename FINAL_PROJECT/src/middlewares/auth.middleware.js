const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const protect = (req, res, next) => {
    try {

        // 1. get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new AppError("No token provided",401);
        }

        // 2. format: Bearer TOKEN
        const token = authHeader.split(" ")[1];

        if (!token) {
            throw new AppError("Invalid token format",401);
        }

        // 3. verify token
        const decoded = jwt.verify(token,  process.env.JWT_SECRET);

        // 4. attach user to request
        req.user = decoded;

        next();

    } catch (error) {
        next(error);
    }
};

module.exports = protect;