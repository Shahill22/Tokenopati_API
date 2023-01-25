//loading modules
const mongoose = require("mongoose");

//Creating Schema
const answerSchema = new mongoose.Schema({
  options: {
    type: Array,
    required: true,
    minlength: 4,
  },

  questionID: {
    type: mongoose.Schema.ObjectId,
    ref: "Question",
    required: true,
  },
  correctOption: {
    type: Number,
  },
});

//Creating Model
const Answer = mongoose.model("Answer", answerSchema);

//export
module.exports = Answer;
