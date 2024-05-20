const express = require("express");
const mongoose = require("mongoose");

const app = express();

const mainRouter = require("./routes/index");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
