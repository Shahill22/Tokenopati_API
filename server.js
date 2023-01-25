//loading modules
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//uncaught exception event
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

//configuration file
dotenv.config({ path: "./config.env" });
const app = require("./app");

//DB Connection
const DB = process.env.DB_URL;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB connection successful!");
  });

//setting up port connection
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
//unhandled rejection event
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
