//loading modules
const Answer = require("./../models/answer");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("../utils/appError");

//Create a new answer
exports.createAnswer = async (req, res, next) => {
  const newAnswer = await Answer.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      answer: newAnswer,
    },
  });
  console.log("Answer added Successfully.");
};
exports.updateAnswer = async (req, res, next) => {
  const answer = await Answer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!answer) {
    return next(new AppError("No answer found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      answer: answer,
    },
  });
};
//Get all answers
exports.getAllAnswers = async (req, res, next) => {
  const features = new APIFeatures(Answer.find(), req.query).paginate();

  const answers = await Answer.find();

  //Responses
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: answers.length,
    data: {
      answers: answers,
    },
  });
  console.log("All answers are listed.");
};
//Get one answers
exports.getAnswer = async (req, res, next) => {
  const answer = await Answer.findById(req.params.id);

  if (!answer) {
    return next(new AppError("No answer found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      answer: answer,
    },
  });
};
//Delete a answer
exports.deleteAnswer = async (req, res, next) => {
  const answer = await Answer.findByIdAndDelete(req.params.id);

  if (!answer) {
    return next(new AppError("No answer found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
  });
};
