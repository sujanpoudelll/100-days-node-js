const AppError = require('../utils/AppError');
const {registerSchema,loginSchema} = require('../validators/authValidator');
const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/authService');

const registerUser = asyncHandler(async(req, res, next) => { // User registraion handling function

        const result = registerSchema.safeParse(req.body);
        if(!result.success){
            const messages = result.error.issues.map(i => i.message).join(", ");
            return next(new AppError(messages, 400));
            
        }

        await authService.register(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully !"

        });
    
});

const loginUser = asyncHandler(async(req, res, next) => { // User login function
    
        
        const result = loginSchema.safeParse(req.body);
       if(!result.success){
            const messages = result.error.issues.map(i => i.message).join(", ");
            throw new AppError(messages,400)

        }
        const token = await authService.login(req.body);

        res.status(200).json({
            success: true,
            message: "Login successful !",
            token

        });
    
});

module.exports = {
    registerUser,
    loginUser
};

