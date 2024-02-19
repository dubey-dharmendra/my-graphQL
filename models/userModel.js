const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

module.exports = new mongoose.model("User", userSchema);
