const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",

  logging: false, // Disable query logging
});

// Test the database connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Database connection has been established successfully.");
//   })
//   .catch((error) => {
//     console.error("Unable to connect to the database:", error);
//   });

module.exports = sequelize;
