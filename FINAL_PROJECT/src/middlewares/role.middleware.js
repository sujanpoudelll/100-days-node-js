const authorize = (...roles) => {
    return (req, res, next) => {
        try {

            if (!roles.includes(req.user.role)) {
                const error = new Error("Access denied: insufficient permissions");
                error.statusCode = 403;
                throw error;
            }

            next();

        } catch (error) {
            next(error);
        }
    };
};

module.exports = authorize;