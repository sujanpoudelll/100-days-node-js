const express = require('express');
const app = express();

const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

app.use(helmet());

app.use(cors({
    origin: "*"
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many requests, try again later"
});
app.use(limiter);

app.use(express.json());



// routes
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/students', studentRoutes);
app.use('/auth', authRoutes);

// error middleware
const errorHandler = require('./middlewares/error.middleware');
app.use(errorHandler);

module.exports = app;

