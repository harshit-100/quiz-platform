const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../db");
const Question = require("./Question");
const Option = require("./Option");

const Quiz = sequelize.define("Quiz", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Quiz.hasMany(Question, { onDelete: "cascade" });
Question.belongsTo(Quiz);

Question.hasMany(Option, { onDelete: "cascade" });
Option.belongsTo(Question);

module.exports = Quiz;
