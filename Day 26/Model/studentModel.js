const mongoose = require('mongoose'); //Importing mongoose library


//Defining a schema which shapes of the documents within that collection
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    marks: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
});

module.exports = mongoose.model('Student', studentSchema); // exporting this model for the use in other files