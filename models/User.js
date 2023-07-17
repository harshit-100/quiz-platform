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
  phoneNumber: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
    validate: {
      len: [10, 10],
      isNumeric: true,
    },
  },
  userOtp: {
    type: DataTypes.STRING(6),
    allowNull: true,
    validate: {
      len: [6, 6],
      isNumeric: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(UserQuiz, { onDelete: "cascade" });
UserQuiz.belongsTo(User);

Quiz.hasMany(UserQuiz, { onDelete: "cascade" });
UserQuiz.belongsTo(Quiz);

module.exports = User;
