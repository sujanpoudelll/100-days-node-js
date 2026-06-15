const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const config = require('../config/config');
const User = require('../model/userModel');
const getPermissionsByRole = require('../utils/permission');

const protect = async(req, res, next) => {
    try {
        let token;

        //1. Check token exists
        if(
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ){
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token){
            return next(new AppError("Not logged in",401));
        }

        //2.Verify Token
        const decoded = jwt.verify(token, config.jwtSecret);

        //3.Check user exists
        const currentUser = await User.findById(decoded.id);

        if(!currentUser){
            return next(new AppError("User no longer exists",401));
        }

        //4. Attach user to request
        req.user = {
            ...currentUser._doc,
            permissions: getPermissionsByRole(currentUser.role)
};

        next();


    } catch (error) {
        //Handle JWT errors properly
        if(error.name === 'JsonWebTokenError'){
            return next(new AppError('Invalid token', 401));
        }
        if(error.name === 'TokenExpiredError'){
            return next(new AppError('Token Expired', 401));
        }
        next(error);
        
    }
};

module.exports = protect;

