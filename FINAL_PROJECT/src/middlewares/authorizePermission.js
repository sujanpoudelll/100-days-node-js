const AppError = require('../utils/AppError');

const authorizePermission = (...requiredPermissions) => {
    return (req, res, next) => {

        if (!req.user) {
            return next(new AppError("Not authenticated", 401));
        }

        const userPermissions = req.user.permissions || [];

        const hasPermission = requiredPermissions.some(permission =>
            userPermissions.includes(permission)
        );

        if (!hasPermission) {
            return next(new AppError("Forbidden: insufficient permissions", 403));
        }

        next();
    };
};

module.exports = authorizePermission;