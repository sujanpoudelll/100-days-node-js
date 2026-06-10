const express = require('express');
const app = express();

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

