const AppError = require('../utils/AppError');
const {registerSchema,loginSchema} = require('../validators/authValidator');
const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/authService');
const apiResponse = require('../utils/apiResponse');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../model/userModel');

const registerUser = asyncHandler(async(req, res, next) => { // User registraion handling function

        await authService.register(req.body);
        return apiResponse (res, 201, "User registered successfully", {name: req.body.name});
});

const loginUser = asyncHandler(async(req, res, next) => { // User login function


        const tokens = await authService.login(req.body);
        return apiResponse(res, 200, "Login successful", tokens );  
});

const refreshAccessToken = asyncHandler(async (req, res, next) => {

    const { refreshToken } = req.body;

    if (!refreshToken) {
        return next(new AppError("Refresh token required", 401));
    }

    try {
        const decoded = jwt.verify(refreshToken, config.jwtRefreshSecret);

        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return next(new AppError("Invalid refresh token", 401));
        }

        const newAccessToken = jwt.sign(
            { id: decoded.id, role: user.role },
            config.jwtSecret,
            { expiresIn: '1h' }
        );

        return apiResponse(res, 200, "Token refreshed", {
            accessToken: newAccessToken
        });

    } catch (err) {
        return next(new AppError("Invalid or expired refresh token", 401));
    }
});

const logoutUser = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new AppError("User not found", 404));
    }

    // remove refresh token
    user.refreshToken = null;
    await user.save();

    return apiResponse(res, 200, "Logged out successfully", null);
});


module.exports = {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser
};

