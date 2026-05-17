const express = require('express'); // Import the Express library
const app = express(); // Initialize the Express application instance
const PORT = 5001; // Define the port number for the server

app.use(express.json()); // Built-in middleware to parse incoming JSON payloads and attaches to req.body

// Mount the router (using app with router) for student-related endpoints(or specific path base)
const studentRoutes = require('./Routes/studentRoutes'); //Importing custom route file having specific endpoints (like GET, POST, DELETE for students).
app.use('/students',studentRoutes); // Linking studentRoutes file to the app


// Start the server and listen on the specified port 
app.listen(PORT,() =>{
    console.log(`Server is running on http://localhost:${PORT}`);
}); // () is callback function and runs after the server started listening



