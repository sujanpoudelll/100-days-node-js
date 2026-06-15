const express = require('express');
const router = express.Router();

const validate = require('../middlewares/validate');
const {registerSchema} = require('../validators/authValidator');
const {registerUser, loginUser, refreshAccessToken,logoutUser} = require('../controllers/authController');
const protect = require('../middlewares/auth.middleware');


router.post(
    '/register',
    validate(registerSchema),
    registerUser
);
router.post('/login',loginUser);
router.post('/refresh', refreshAccessToken);
router.post('/logout', protect, logoutUser);


module.exports = router;

