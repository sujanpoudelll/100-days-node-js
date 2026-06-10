require('dotenv').config();
const app = require('./app');
const config = require('./config/config');
const mongoose = require('mongoose');

const PORT = config.port || 5001;

mongoose.connect(config.mongoUri)
.then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch(err => console.log(err));


