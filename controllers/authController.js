const otpService = require('../services/otp.services.js');
const userService = require('../services/user.services.js');
const jwt = require('jsonwebtoken');
const profileService = require('../services/profile.services.js');

exports.sendOTP = async (req, res) => {
    const { phoneNumber } = req.body;
    /* The check of if user is already registered is yet to be done */
  
    try {
        const otp = await otpService.sendOtp(phoneNumber);
        res.status(200).json("OTP sent successfully");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.register = async (req, res) => {
    console.log("body", req.body);
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

    const profileData = {
        userId: user.id,
        name: user.name,
        mobile: user.mobile
    };

    const profile = await profileService.createProfile(profileData);
    
    if(!profile) {
        return res.status(500).json({ error: 'Failed to create profile' });
    }

    console.log("profile", profile);
    
    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.SECRETKEY, { expiresIn: '20d' });

    res.status(201).json({ token, userId: user.id });
};


exports.login = async (req, res) => {
    const { mobileNumber, password } = req.body;
    const user = await userService.getUserByMobile(mobileNumber);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await userService.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.SECRETKEY, { expiresIn: '4d' });
    console.log(user.id)
    res.status(200).json({ token, userId: user.id });
}