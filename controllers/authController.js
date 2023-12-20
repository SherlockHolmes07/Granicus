const otpService = require('../services/otp.services.js');
const { validationResult } = require('express-validator');
const userService = require('../services/user.services.js');

exports.sendOTP = async (req, res) => {
    const { phoneNumber } = req.body;
    try {
        const otp = await otpService.sendOtp(phoneNumber);
        res.status(200).json("OTP sent successfully");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const isOtpValid = await otpService.verifyOtp(req.body.mobileNumber, req.body.otp);
    if (!isOtpValid) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    const userData = {
        name: req.body.name,
        password: req.body.password,
        mobile: req.body.mobileNumber,
    };

    if(req.body.email) {
        userData.email = req.body.email;
    }

    const user = await userService.createUser(userData);
    if (!user) {
      return res.status(500).json({ error: 'Failed to create user' });
    }
  
    res.status(201).json({ message: 'User created successfully', user: user });
};