const bcrypt = require('bcryptjs'); //A library used to securely hash and store passwords
const jwt = require('jsonwebtoken'); //A library used to generate unique, encrypted digital tokens

const User = require('../Model/userModel'); //importing the userModel schema 

const registerUser = async(req, res, next) => { // User registraion handling function
    try{
        const {name, email, password} = req.body;

        //Check if user exists 
        const existingUser = await User.findOne({email});

        if(existingUser){
            const error = new Error('User already exists !');
            error.statusCode = 400;
            throw error;
        }

        //hashed password
        const hashPassword = await bcrypt.hash(password,10); //password is hashed making highly secure, unique and unreadable

        //Create user
        const user = await User.create({  //user creation
            name, email, password: hashPassword 
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully !"

        });
    }
    catch(error){
        next(error);
      }

}

const loginUser = async(req, res, next) => { // User login function
    try{
        const {email, password} = req.body;

        //Check if user exists
        const user = await User.findOne({email}); //looks for user with req email

        if(!user){
            const error = new Error("Invalid email or password!");
            error.statusCode = 401;
            throw error;

        }

        //Compare password
        const isMatch = await bcrypt.compare(password, user.password); //compares stored and entered password in hash
        if(!isMatch){
            const error = new Error("Invalid email or password!");
            error.statusCode = 401;
            throw error;   
        }

        //Generate JWT token
        const token = await jwt.sign( //construct and encrypt token taking 3 major arguments
            {id: user.id, email: user.email}, //Payload for embedding public data
            "secretKey123", //Secret key for encryption
            {expiresIn: "1d"} //Config options for seting lifespan of token
        );

        res.status(200).json({
            success: true,
            message: "Login successful !",
            token

        });
    }
    catch(error){
        next(error);
      }

}

module.exports = {
    registerUser,
    loginUser
};