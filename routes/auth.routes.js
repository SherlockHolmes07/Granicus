const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');

router.post('/sendOTP', authController.sendOTP);

router.post('/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').optional().isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters'),
    body('mobileNumber').isMobilePhone().withMessage('Invalid mobile number'),
    body('otp').isNumeric().withMessage('Invalid OTP'),
  ],
  authController.register
);


module.exports = router;