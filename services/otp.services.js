const crypto = require('crypto');

// Generate an OTP
const generateOtp = () => {
    const otp = crypto.randomInt(100000, 999999);
    return otp;
};

// Verify an OTP
const verifyOtp = (inputOtp, actualOtp) => {
    return inputOtp === actualOtp;
};

module.exports = {
    generateOtp,
    verifyOtp
};