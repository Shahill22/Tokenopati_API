//loading modules
const mongoose = require("mongoose");

//Creating Schema
const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A question must have a title."],
    unique: true,
    minlength: [5, "Please provide title at least 5 characters"],
  },
  content: {
    type: String,
    required: [true, "A question must have content."],
    unique: true,
    minlength: [10, "Please provide title at least 10 characters"],
  },

  difficulty: {
    type: String,
    required: true,
  },
  answerID: {
    type: mongoose.Schema.ObjectId,
    ref: "Answer",
    //required: true,
  },
  time: {
    type: Number,
    require: true,
  },
  rewardMultiplier: {
    type: Number,
    require: true,
  },
});

//Creating Model
const Question = mongoose.model("Question", questionSchema);

//export
module.exports = Question;
