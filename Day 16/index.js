
const express = require('express');
const app = express();

const PORT = 5001;


//If a request comes in with JSON data, automatically parse it and turn it into a JavaScript object for me."
app.use(express.json());


//Route
app.get("/", (req, res) => {
    console.log("Root route hit");
    res.send("Hello from Express Server !");
});

app.get("/about", (req, res)=>{
    console.log("About route hit");
    res.send("Hello from the About page !")
});

app.get("/users", (req, res)=>{
    console.log("Users route hit");
    res.send("Hello from the Users page !")
});



//It tells the app to start listening for events on the specified port.
app.listen(PORT,() => {
    console.log(`Server running on http://localhost:${PORT}`);
});





