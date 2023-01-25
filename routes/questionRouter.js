//loading modules
const express = require("express");
const questionController = require("./../controllers/questionController");
//creating router
const router = express.Router();
//routes
router.route("/getRandomQuestions").get(questionController.getRandomQuestions);
router
  .route("/")
  .post(questionController.createQuestion)
  .get(questionController.getAllQuestions);
router
  .route("/:id")
  .patch(questionController.updateQuestion)
  .get(questionController.getQuestion)
  .delete(questionController.deleteQuestion);
router.route("/correctAnswer/:id").get(questionController.getCorrectAnswer);

//export
module.exports = router;
