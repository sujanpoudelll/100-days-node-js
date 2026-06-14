const AppError = require("../utils/appError");

const restricTo = (...roles) => {
    return (req, res, next) => {

           
            if (!roles.includes(req.user.role)) {
                throw new AppError("You do not have permission to perform this action ",403);
            }

            next();


    };
};

module.exports = restricTo;

