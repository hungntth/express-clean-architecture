require("dotenv").config();
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const express = require("express");
const app = express();

//initialize database
require("./infrastructure/database/db.init");

//TODO logger

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./interfaces/routes"));

//handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// error handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  console.log("[ERROR]: ", err);
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
