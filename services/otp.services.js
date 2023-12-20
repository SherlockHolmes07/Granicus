const axios = require("axios");
const twilio = require("twilio");
const db = require("../models");
const Otp = db.otps;
const Users = db.users;


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendSms = async (to, body) => {
  try {
    const message = await client.messages.create({
      to: `+91${to}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: body,
    });

    console.log("Message sent:", message.sid);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
}

const sendOtp = async (mobileNumber) => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  const message = `Your Jain Census OTP is ${otp}`;

  let otpRecord = await Otp.findOne({ mobileNumber: mobileNumber });

  // get user form Users table and delete if exists
  const user = await Users.findOne({ mobile: mobileNumber });
  if (user) {
    await user.destroy();
  }
  
  if (otpRecord) {
    otpRecord.otp = otp;
    await otpRecord.save();
  } else {
    otpRecord = new Otp({ mobileNumber: mobileNumber, otp: otp });
    await otpRecord.save();
  }
  
  sendSms(mobileNumber, message);
  return otp;
};


const verifyOtp = async(mobileNumber, otp) => {
  const otpRecord = await Otp.findOne({ mobileNumber: mobileNumber });
  // convert to string to compare
  if (otpRecord && otpRecord.otp.toString() === otp) {
    return true;
  }
  console.log(otpRecord.otp.toString(), otp);
  return false;
}

module.exports = {
  sendOtp,
  verifyOtp
};
