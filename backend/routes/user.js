const express = require("express");
const router = express.Router();
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { auth, authRoles } = require("../middleware/auth");
//*Register user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "thisissamplepublicid",
        url: "sampleUrl",
      },
    });
    const token = user.getJWT();
    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(500).send("error" + error.message);
  }
});

//*login for user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //*if user has given email and password then
    if (!email || !password) {
      res.status(400).send("Please enter your email and password");
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send("invalid email or password");
    }
    const isComparePassword = await bcrypt.compare(password, user.password);
    if (!isComparePassword) {
      res.status(400).send("invalid email or password");
    }
    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      // secure: true,
      //* secure:false put when https is not available
      secure: false,
    });
    // let cookies = req.cookies;
    // console.log(cookies);
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//*logout user
router.get("/logout", (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({ success: true, message: "logout successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//*forgot password
router.post("/password/forget", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  //Get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  // console.log(resetToken);
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;
  const message = `<h2>Your password reset is  :- </h2>\n\n ${resetPasswordUrl} <br> If you have not requested your email then Please ignore it`;
  try {
    //* basically sendEmail(options) helps us to get the sender email,subject and message
    await sendEmail({
      email: user.email,
      subject: "ClubX Password recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} successfully`,
    });
  } catch (error) {
    user.restPasswordToken = undefined;
    user.restPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).send(error.message);
  }
});

router.put("/password/reset/:token", async (req, res) => {
  const restPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    restPasswordToken,
    restPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400).send("Reset password token is invalid or has been expired");
  }
  if (req.body.password !== req.body.confirmPassword) {
    res.status(400).send("Password does not match");
  }
  user.password = req.body.password;
  user.restPasswordToken = undefined;
  user.restPasswordExpire = undefined;
  await user.save();
  res.status(200).json({
    success: true,
    messsage: "Password has been updated successfully",
    user,
  });
});

//* Get user data by id
router.get("/user/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      res.status(404).send("User not found");
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//* Update user password
router.put("/user/password/update", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).send("User not found");
    }
    const isComparePassword = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );
    if (!isComparePassword) {
      res.status(400).send("Your old password is incorrect");
    }
    const { newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      res.status(400).send("Password does not match");
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//*Update user profile
router.put("/user/profile/update", auth, async (req, res) => {
  try {
    const updateProfile = {
      name: req.body.name,
      email: req.body.email,
    };
    const user = await User.findByIdAndUpdate(req.user.id, updateProfile, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//*Get all users -- admin
router.get("/admin/users", async (req, res) => {
  try {
    const user = await User.find();
    const userCount = await User.countDocuments();
    res.status(200).json({ success: true, user, userCount });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//get user by id -- admin
router.get("/admin/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//*Update user profile --admin
router.put("/admin/user/:id", auth, authRoles("admin"), async (req, res) => {
  try {
    const updateProfile = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
    const user = await User.findByIdAndUpdate(req.user.id, updateProfile, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//*delete user profile --admin
router.delete("/admin/user/:id", auth, authRoles("admin"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("User not found");
    }
    await user.remove();
    res
      .status(200)
      .json({ success: true, message: "Successfully removed user" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
