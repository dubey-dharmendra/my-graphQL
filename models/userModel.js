const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: Numbers, required: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = new mongoose.model("User", userSchema);
