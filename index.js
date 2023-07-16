require("dotenv").config();
const express = require("express");
const sequelize = require("./db"); // Import the database connection

const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(express.json());

// Test the server endpoint
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Middleware to handle routes
app.use("/api/users", userRoutes);
app.use("/api/quizzes", quizRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Sync the database models
sequelize.sync({ force: false }).then(() => {
  console.log("Database models synced successfully.");
});
