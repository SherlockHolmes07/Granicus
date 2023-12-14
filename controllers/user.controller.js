const userService = require('../services/user.service');

exports.register = async (req, res) => {
  try {
    // extract user details from request body
    const { name, mobile, email, password } = req.body;

    // verify if the mobile number is already registered
    const existingUser = await userService.getUserByMobile(mobile);
    if (existingUser) {
      return res.status(400).send({ message: 'Mobile number already registered' });
    }

    // call otp service to send otp to mobile number
    const otp = await otpService.sendOtp(mobile);

  } catch (error) {
    res.status(500).send({ message: 'Error registering user', error });
  }
};
