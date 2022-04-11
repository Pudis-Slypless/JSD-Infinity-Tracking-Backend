const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const config = require("./config");

const userRouter = require("./routers/user");

const app = express();

app.use(bodyParser.json());

app.use("/users", userRouter);

const boot = async () => {
  // Connect to mongodb
  await mongoose.connect(config.mongoUri, config.mongoOptions);
  // Start express server
  app.listen(4000, () => {
    console.log("Server is running");
    console.log("PostMan GET POST DELETE is Ready !!!");
  });
};

boot();
