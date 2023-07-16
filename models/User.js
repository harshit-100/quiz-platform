const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../db");
const UserQuiz = require("./UserQuiz");
const Quiz = require("./Quiz");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(UserQuiz, { onDelete: "cascade" });
UserQuiz.belongsTo(User);

Quiz.hasMany(UserQuiz, { onDelete: "cascade" });
UserQuiz.belongsTo(Quiz);

module.exports = User;
