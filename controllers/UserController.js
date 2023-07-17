const jwt = require("jsonwebtoken");
const md5 = require("md5");

const User = require("../models/User");
const smsService = require("../services/sms");

// Register a new user
async function registerUser(req, res) {
  const { username, password, phoneNumber } = req.body;

  try {
    const existingUser = await User.findOne({
      where: { username },
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const userOtp = smsService(String(phoneNumber), res);
    let hashedPassword = md5(password);

    if (typeof userOtp !== "number" || typeof userOtp !== "string") {
      return; //SMS service error
    }

    if (userOtp !== 0 || userOtp !== 1) {
      const user = await User.create({
        username,
        password: hashedPassword,
        phoneNumber,
        userOtp,
      });
      res.status(201).json({ message: "Please verify your number.", user });
    } else if (userOtp === 0) {
      res
        .status(401)
        .json({ error: "error", message: "Please enter a valid number." });
    } else {
      res.status(500).json({ message: "Failed to register user." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to register user." });
  }
}

// Authenticate a user
async function authenticateUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    if (user.verified !== true) {
      res
        .status(401)
        .json({ error: "error", message: "User is not verified." });
      return;
    }

    let hashedPassword = md5(password);
    if (user.password !== hashedPassword) {
      res.status(401).json({ message: "Invalid password." });
      return;
    }

    const values = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(values, process.env.JWT_SECRET);

    res.json({ message: "User authenticated successfully!", token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to authenticate user." });
  }
}

//Verify user
const userVerification = async (req, res) => {
  const { otp } = req.body;
  try {
    const user = await User.findOne({ where: { userOtp: otp } });

    if (user) {
      user.verified = true;
      user.userOtp = null;
      await user.save();
      res.status(200).json({ message: "User verified successfully.", user });
    } else {
      res.status(404).json({ message: "User not found or alrady exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to verify user." });
  }
};

const resetPassword = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const user = User.findOne({ where: { phoneNumber: phoneNumber } });
    console.log(
      "user",
      user.then((value) => console.log(value))
    );
    const userOtp = smsService(String(user.phoneNumber), res);

    if (typeof userOtp !== "number" || typeof userOtp !== "string") {
      return; //SMS service error
    }

    if (userOtp !== 0 || userOtp !== 1) {
      res.status(201).json({ message: "Please verify your number.", user });
    } else if (userOtp === 0) {
      res
        .status(401)
        .json({ error: "error", message: "Please enter a valid number." });
    } else {
      res.status(500).json({ message: "Failed to send otp." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to reset password." });
  }
};

module.exports = {
  registerUser,
  authenticateUser,
  userVerification,
  resetPassword,
};
