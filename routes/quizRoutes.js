const express = require("express");
const router = express.Router();

const QuizController = require("../controllers/QuizController");
const { authorizeUser } = require("../middlewares/auth");

// Create a new quiz
router.post("/", authorizeUser, QuizController.createQuiz);

// Get all quizzes
router.get("/", authorizeUser, QuizController.getAllQuizzes);

// Get a specific quiz by ID
router.get("/:quizId", authorizeUser, QuizController.getQuizById);

// Take a quiz
router.post("/:quizId/take", authorizeUser, QuizController.takeQuiz);

// Get highest scores for a quiz
router.get("/:quizId/scores", authorizeUser, QuizController.getHighestScores);

//Delete quize by quizid
router.delete(
  "/:quizId/delete",
  authorizeUser,
  QuizController.deleteQuizByUserId
);

module.exports = router;
