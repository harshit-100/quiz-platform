const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

const Question = sequelize.define("Question", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add any other fields you want for your questions
});

module.exports = Question;
