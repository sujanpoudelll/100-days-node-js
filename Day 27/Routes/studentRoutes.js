const express = require('express'); // Import the Express library
const router = express.Router(); // Create an isolated Express router instance

const studentController = require('../Controllers/studentController'); // Import the custom controller file to handle logics
const protect = require('../Middlewares/auth.middleware');

// Define HTTP routes and map them to controller actions
router.get('/',protect,studentController.getAllStudents);
router.post('/',studentController.addStudent);
router.put('/:id',studentController.updateStudent);
router.delete('/:id',studentController.deleteStudent);
router.get('/:id',studentController.getStudentById);

module.exports = router; // Export the router module for use in the main app //
// Exposes the configured router object so that other files can use it.

