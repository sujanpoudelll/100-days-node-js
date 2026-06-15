const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
 

//Register
 const register = async(data) =>{
 
    const {name, email, password, role} =data;
       
        //Check if user exists 
        const existingUser = await User.findOne({email});

        if(existingUser){
            throw new AppError("Email already exists",400);
        }

        //hashed password
        const hashPassword = await bcrypt.hash(password,10); //password is hashed making highly secure, unique and unreadable

        //Create user
        const user = await User.create({  //user creation
            name, email, password: hashPassword, role
        });

        return user;
    };

    const login = async(data) =>{

        const {email, password} = data;

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
        const accessToken = await jwt.sign( //construct and encrypt token taking 3 major arguments
            {id: user.id, email: user.email, role: user.role}, //Payload for embedding public data
            config.jwtSecret, //Secret key for encryption
            {expiresIn: "1h"} //Config options for seting lifespan of token
        );

        const refreshToken = await jwt.sign(
            {
                id: user._id
            },
            config.jwtRefreshSecret,
            {expiresIn: "1d"}
        );
        return {accessToken,refreshToken}
    }

    module.exports = {register,login};