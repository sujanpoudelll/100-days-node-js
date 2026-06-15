const AppError = require("../utils/appError");

const authorize = (...roles) => {
    return (req, res, next) => {

            if (!req.user) {
                return next(new AppError("Not authenticated", 401));
            }
           
            if (!roles.includes(req.user.role)) {
                throw new AppError("You do not have permission to perform this action ",403);
            }

            next();


    };
};

module.exports = authorize;

