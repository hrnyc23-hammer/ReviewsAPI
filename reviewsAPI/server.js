const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const Routes = require("./server/rounter.js");
const path = require("path");

const app = express();
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "./app")));
app.use("/reviews", Routes);

//load testing
app.get("/loaderio-79770166efad79bbcbe0c864f8722f52", (req, res) => {
  res.sendStatus(200);
});

app.post("/loaderio-79770166efad79bbcbe0c864f8722f52", (req, res) => {
  res.sendStatus(201);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
