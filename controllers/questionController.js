//loading modules
const Question = require("./../models/question");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("../utils/appError");
const { request } = require("https");
const Answer = require("../models/answer");

//Create a new question
exports.createQuestion = async (req, res, next) => {
  const newQuestion = await Question.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      question: newQuestion,
    },
  });
  console.log("Question added Successfully.");
};
exports.updateQuestion = async (req, res, next) => {
  const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!question) {
    return next(new AppError("No question found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      question,
    },
  });
};
//Get all questions
exports.getAllQuestions = async (req, res, next) => {
  const { page, limit, query } = req.query;
  const skip = (page - 1) * limit;

  const questions = await Question.find()
    .or([
      { title: { $regex: query, $options: "i" } },

      { difficulty: { $regex: query, $options: "i" } },
    ])
    .select([
      "_id",
      "title",
      "content",
      "difficulty",
      "answerID",
      "time",
      "rewardMultiplier",
    ])
    .skip(skip)
    .limit(limit);

  const count = await Question.countDocuments(
    Question.find().or([
      { title: { $regex: query, $options: "i" } },

      { difficulty: { $regex: query, $options: "i" } },
    ])
  );
  const totalPages = Math.ceil(count / limit);
  const response = {
    title: "List of Questions",
    totalPages: totalPages,
    currentPage: page,
    results: count,
    list: questions,
  };

  //Responses
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    //results: questions.length,
    data: {
      response,
    },
  });
  console.log("All questions are listed.");
};
//Get one question
exports.getQuestion = async (req, res, next) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    return next(new AppError("No question found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      question,
    },
  });
};
//Delete a question
exports.deleteQuestion = async (req, res, next) => {
  const question = await Question.findByIdAndDelete(req.params.id);

  if (!question) {
    return next(new AppError("No question found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
  });
};
exports.getCorrectAnswer = async (req, res, next) => {
  const question = await Question.findById(req.params.id);
  const answer = await Answer.findOne({
    questionID: question._id,
  });
  res.status(200).json({
    status: "success",
    result: {
      questionID: question._id,
      answerID: question.answerID,
      correctoption: answer.correctOption,
      correctAnswer: answer.options[answer.correctOption],
    },
  });
};
exports.getRandomQuestions = async (req, res, next) => {
  try {
    const randomQuestion = await Question.aggregate([{ $sample: { size: 1 } }]);
    res.json(randomQuestion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
