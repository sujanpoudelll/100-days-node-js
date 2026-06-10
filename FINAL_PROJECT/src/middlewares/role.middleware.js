const AppError = require("../utils/appError");

const authorize = (...roles) => {
    return (req, res, next) => {
        try {

            if (!roles.includes(req.user.role)) {
                throw new AppError("Access denied: insufficient permissions ",403);
            }

            next();

        } catch (error) {
            next(error);
        }
    };
};

module.exports = authorize;

