const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const Option = require("../models/Option");
const UserQuiz = require("../models/UserQuiz");

// Create a new quiz
async function createQuiz(req, res) {
  const { title, questions } = req.body;
  const { id } = req.user;

  try {
    const quiz = await Quiz.create({ title, UserId: id });

    for (const questionData of questions) {
      const { content, options } = questionData;

      const question = await Question.create({ content });
      await question.setQuiz(quiz);

      for (const optionData of options) {
        const { content: optionContent, isCorrect } = optionData;

        await Option.create({ content: optionContent, isCorrect }).then(
          (option) => question.addOption(option)
        );
      }
    }

    res.status(201).json({ message: "Quiz created successfully!", quiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create quiz." });
  }
}

// Get all quizzes
async function getAllQuizzes(req, res) {
  try {
    const quizzes = await Quiz.findAll({ include: Question });
    res.json({ quizzes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve quizzes." });
  }
}

// Get a specific quiz by ID
async function getQuizById(req, res) {
  const { quizId } = req.params;

  try {
    const quiz = await Quiz.findByPk(quizId, { include: Question });
    if (!quiz) {
      res.status(404).json({ message: "Quiz not found." });
      return;
    }
    res.json({ quiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve quiz." });
  }
}

async function takeQuiz(req, res) {
  const { quizId, answers, userId } = req.body;

  try {
    // Fetch the quiz and related questions with options
    const quiz = await Quiz.findByPk(quizId, {
      include: { model: Question, include: Option },
    });
    if (!quiz) {
      res.status(404).json({ message: "Quiz not found." });
      return;
    }

    let score = 0;

    // Iterate over the answers and calculate the score
    for (const answerData of answers) {
      const { questionId, optionId } = answerData;

      const question = quiz.Questions.find((q) => q.id === questionId);
      if (!question) {
        continue;
      }

      const option = question.Options.find((o) => o.id === optionId);
      if (!option) {
        continue;
      }

      if (option.isCorrect) {
        score++;
      }
    }

    // Calculate the percentage score
    const totalQuestions = quiz.Questions.length;
    const percentageScore = (score / totalQuestions) * 100;

    // Create a UserQuiz record to track the user's score
    await UserQuiz.create({
      UserId: userId,
      QuizId: quiz.id,
      score: percentageScore,
    });

    res.json({
      message: "Quiz submitted successfully!",
      score: percentageScore,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit the quiz." });
  }
}

// Get highest scores for a quiz
async function getHighestScores(req, res) {
  const { quizId } = req.params;

  try {
    const scores = await UserQuiz.getHighestScoresByQuiz(quizId);
    res.json({ scores });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve highest scores." });
  }
}

//Delete a specific quiz by ID
async function deleteQuizByUserId(req, res) {
  const { quizId } = req.params;
  const { id } = req.user;
  try {
    const deletedRows = await Quiz.destroy({
      where: {
        id: quizId,
        UserId: id,
      },
    });
    if (!deletedRows)
      return res
        .status(400)
        .json({ message: "Only admin user can delete this quiz." });
    res.status(200).json({ message: "Quiz deleted succesfully.", deletedRows });
  } catch (error) {
    res.status(500).json({ message: "Faild to delete the quize." });
  }
}

module.exports = {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  takeQuiz,
  getHighestScores,
  deleteQuizByUserId,
};
