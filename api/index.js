const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4001;
const config = require("../src/config");

const userRouter = require("../src/routers/user");

const app = express();

/*
When running on Vercel, Vercel will take express "app" exported from this file.
We do not have control over port and things that should be run before the app.listen()
eg. mongoose.connect(). So we should connect to mongodb before every request by adding middleware below
to ensure database is connected before our code trying to query the it.

Note: Create new connection to database before every request is not a good practice and can cause issues for some database.
 */
if (config.isVercel) {
  app.use(async (req, res, next) => {
    await mongoose.connect(config.mongoUri, config.mongoOptions);
    return next();
  });
}

// Body parser to parse json in request body for us
app.use(bodyParser.json());
// CORS
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

// Our routers
app.use("/users", userRouter);

module.exports = app;
