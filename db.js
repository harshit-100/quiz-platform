const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "your-database-name",
  "your-username",
  "your-password",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
