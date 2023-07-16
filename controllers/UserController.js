const User = require("../models/User");

// Register a new user
async function registerUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.create({ username, password });
    res.status(201).json({ message: "User registered successfully!", user });
  } catch (error) {
    console.error(error);
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

    if (user.password !== password) {
      res.status(401).json({ message: "Invalid password." });
      return;
    }

    res.json({ message: "User authenticated successfully!", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to authenticate user." });
  }
}

module.exports = { registerUser, authenticateUser };
