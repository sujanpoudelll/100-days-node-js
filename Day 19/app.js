const express = require('express');
const app = express();

const PORT = 5001;

app.use(express.json());

const studentRoutes = require('./routes/studentRoutes');
app.use('/students',studentRoutes);

app.listen(PORT,() =>{
    console.log(`Server is running on http://localhost:${PORT}`);
});