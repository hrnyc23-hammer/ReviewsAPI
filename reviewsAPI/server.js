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

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
