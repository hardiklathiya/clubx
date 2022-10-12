const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const JsonWebToken = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config({ path: "./config/.env" });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name can not exceed 30 characters"],
    minLength: [4, "Name must be at least 4 characters long"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Name must be at least 6 characters long"],
    // select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  restPasswordToken: String,
  restPasswordExpire: Date,
});

//password hashing with bcrypt.js
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  let sault = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, sault);
});

//*jsonwebtoken
userSchema.methods.getJWT = function () {
  return JsonWebToken.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//* Generating password reset token
userSchema.methods.getResetPasswordToken = function () {
  //*generating token
  const resetToken = crypto.randomBytes(20).toString("hex");
  // console.log(resetToken);

  //*Hashing and adding resetPasswordToken to userSchema
  this.restPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.restPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
