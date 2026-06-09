const bcrypt = require('bcryptjs'); //A library used to securely hash and store passwords
const jwt = require('jsonwebtoken'); //A library used to generate unique, encrypted digital tokens
const AppError = require('../utils/appError');

const User = require('../model/userModel'); //importing the userModel schema 

const {registerSchema,loginSchema} = require('../validators/authValidator');
const asyncHandler = require('../utils/asyncHandler');

const registerUser = asyncHandler(async(req, res, next) => { // User registraion handling function

        const {name, email, password, role} = req.body;
        const result = registerSchema.safeParse(req.body);
        if(!result.success){
            const messages = result.error.issues.map(i => i.message).join(", ");
            return next(new AppError(messages, 400));
            
        }
        
        //Check if user exists 
        const existingUser = await User.findOne({email});

        if(existingUser){
            throw new AppError("User already exists",400);
        }

        //hashed password
        const hashPassword = await bcrypt.hash(password,10); //password is hashed making highly secure, unique and unreadable

        //Create user
        const user = await User.create({  //user creation
            name, email, password: hashPassword, role
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully !"

        });
    
});

const loginUser = asyncHandler(async(req, res, next) => { // User login function
    
        const {email, password} = req.body;
        const result = loginSchema.safeParse(req.body);
       if(!result.success){
            const messages = result.error.issues.map(i => i.message).join(", ");
            throw new AppError(messages,400)

        }

        //Check if user exists
        const user = await User.findOne({email}); //looks for user with req email

        if(!user){
            throw new AppError("Invalid email or password",401);

        }

        //Compare password
        const isMatch = await bcrypt.compare(password, user.password); //compares stored and entered password in hash
        if(!isMatch){
            throw new AppError("Invalid email or password",401);
            
        }

        //Generate JWT token
        const token = await jwt.sign( //construct and encrypt token taking 3 major arguments
            {id: user.id, email: user.email, role: user.role}, //Payload for embedding public data
            process.env.JWT_SECRET, //Secret key for encryption
            {expiresIn: "1d"} //Config options for seting lifespan of token
        );

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