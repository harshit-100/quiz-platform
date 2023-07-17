const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../db");

const UserQuiz = sequelize.define("UserQuiz", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  score: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
});

UserQuiz.getHighestScoresByQuiz = async function (quizId, limit = 10) {
  try {
    const scores = await UserQuiz.findAll({
      where: { QuizId: quizId },
      order: [["score", "DESC"]],
      limit,
      include: [{ model: sequelize.models.User, attributes: ["username"] }],
    });

    return scores;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve highest scores for the quiz.");
  }
};

module.exports = UserQuiz;
