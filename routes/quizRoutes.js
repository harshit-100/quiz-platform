const express = require("express");
const router = express.Router();
const QuizController = require("../controllers/QuizController");

// Create a new quiz
router.post("/", QuizController.createQuiz);

// Get all quizzes
router.get("/", QuizController.getAllQuizzes);

// Get a specific quiz by ID
router.get("/:quizId", QuizController.getQuizById);

// Take a quiz
router.post("/:quizId/take", QuizController.takeQuiz);

// Get highest scores for a quiz
router.get("/:quizId/scores", QuizController.getHighestScores);

module.exports = router;
