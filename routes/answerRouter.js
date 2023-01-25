//loading modules
const express = require("express");
const answerController = require("./../controllers/answerController");
//creating router
const router = express.Router();
//routes
router
  .route("/")
  .post(answerController.createAnswer)
  .get(answerController.getAllAnswers);
router
  .route("/:id")
  .patch(answerController.updateAnswer)
  .get(answerController.getAnswer)
  .delete(answerController.deleteAnswer);
//export
module.exports = router;
