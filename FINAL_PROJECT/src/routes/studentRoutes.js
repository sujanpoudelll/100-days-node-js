const express = require('express'); // Import the Express library
const router = express.Router(); // Create an isolated Express router instance

const studentController = require('../controllers/studentController'); // Import the custom controller file to handle logics
const protect = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');

// Define HTTP routes and map them to controller actions
router.get('/',protect,studentController.getAllStudents);
router.post('/',protect, authorize('admin','manager'),studentController.addStudent);
router.put('/:id',protect, authorize('admin'),studentController.updateStudent);
router.delete('/:id',protect, authorize('admin'),studentController.deleteStudent);
router.get('/:id',protect,studentController.getStudentById);


module.exports = router; // Export the router module for use in the main app //
// Exposes the configured router object so that other files can use it.

