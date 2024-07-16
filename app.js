require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

const mainRouter = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const checkImplicitErrors = require("./middlewares/checkImplicitErrors");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(requestLogger);
app.use("/", mainRouter);
app.use(errorLogger);
app.use(errors());
app.use(checkImplicitErrors);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
