const User = require("../models/userModel");
const Otp = require("../models/otpModel");

exports.createUser = async (data) => {
  return await User.create(data);
};

exports.getUsers = async () => {
  return await User.find();
};

exports.findByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.saveOtp = async (user, g_otp) => {
  return await Otp.findOneAndUpdate(
    { user_id: user.id },
    { otp: g_otp, timestamp: Date.now },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};

// exports.verifyOtp = async (id) => {
//   const getOtpData = await Otp.findById(id);
//   if (getOtpData) await User.f
// };
