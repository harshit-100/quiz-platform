const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// User registration route
router.post("/register", UserController.registerUser);

// User authentication route
router.post("/login", UserController.authenticateUser);

module.exports = router;
