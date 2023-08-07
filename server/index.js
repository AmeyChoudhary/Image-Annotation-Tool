const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

const port = 3031;

const postsRouter = require("./routes/posts");

app.use(logger("dev"));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/posts", postsRouter);

app.listen(port, function () {
  console.log("Runnning on " + port);
});
module.exports = app;