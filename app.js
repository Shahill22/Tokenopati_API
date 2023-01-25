//loading modules
const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const questionsRouter = require("./routes/questionRouter");
const answersRouter = require("./routes/answerRouter");

const app = express();

console.log(`Running on ${process.env.NODE_ENV} mode.`);
//development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//parsing incoming requests with json payload
app.use(express.json({ limit: "10 kb" }));
//return requested time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//routes
app.use("/questions", questionsRouter);
app.use("/answers", answersRouter);
//AppError 404
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
  console.log("Oops! Not Found !".red);
});
//Global error handling middleware
app.use(globalErrorHandler);
//export
module.exports = app;
