const express = require('express');
const router = express.Router();

const validate = require('../middlewares/validate');
const {registerSchema} = require('../validators/authValidator');
const {registerUser, loginUser, refreshAccessToken} = require('../controllers/authController');


router.post(
    '/register',
    validate(registerSchema),
    registerUser
);
router.post('/login',loginUser);
router.post('/refresh', refreshAccessToken);


module.exports = router;

