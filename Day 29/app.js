const express = require('express'); // Import the Express library
const app = express(); // Initialize the Express application instance
require('dotenv').config(); // Import dotenv package
const PORT = process.env.PORT; // Define the port number for the server
const mongoose = require('mongoose'); //Import the mongoose library


app.use(express.json()); // Built-in middleware to parse incoming JSON payloads and attaches to req.body

mongoose.connect(process.env.MONGO_URI) //Initiating connection to MongoDB server with protocol, localhost, port number and database
.then(() => console.log('MongoDB Connected')) //if connection is succesful
.catch(err => console.log(err)); // if connection fails


// Mount the router (using app with router) for student-related endpoints(or specific path base)
const studentRoutes = require('./Routes/studentRoutes'); //Importing custom route file having specific endpoints (like GET, POST, DELETE for students).
app.use('/students',studentRoutes); // Linking studentRoutes file to the app

const authRoutes = require('./Routes/authRoutes'); //authentication route
app.use('/auth',authRoutes); //linking to app


// Start the server and listen on the specified port 
app.listen(PORT,() =>{
    console.log(`Server is running on http://localhost:${PORT}`);
}); // () is callback function and runs after the server started listening

const errorHandler = require('./middlewares/error.middleware'); //Import the custom global error handling middleware
const { registerUser } = require('./Controllers/authController');
app.use(errorHandler); // for any error thrown in app and isnt caught is passed to this function



