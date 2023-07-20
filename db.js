const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This option is required for some PostgreSQL setups (e.g., Heroku)
    },
  },
  logging: false, // Disable logging SQL queries (optional)
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
