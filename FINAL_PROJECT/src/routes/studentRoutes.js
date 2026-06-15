const express = require('express'); // Import the Express library
const router = express.Router(); // Create an isolated Express router instance

const studentController = require('../controllers/studentController'); // Import the custom controller file to handle logics
const protect = require('../middlewares/auth.middleware');
const authorizePermission = require('../middlewares/authorizePermission');

// Define HTTP routes and map them to controller actions
router.get(
    '/',protect,
    studentController.getAllStudents
);

router.post(
    '/',
    protect,
    authorizePermission('student:create'),
    studentController.addStudent
);

router.put(
    '/:id',
    protect,
    authorizePermission('student:update'),
    studentController.updateStudent
);

router.delete(
    '/:id',
    protect,
    authorizePermission('student:delete'),
    studentController.deleteStudent
);

router.get(
    '/:id',
    protect,
    studentController.getStudentById
);



module.exports = router; // Export the router module for use in the main app //
// Exposes the configured router object so that other files can use it.

