const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const Routes = require("./server/rounter.js");

const app = express();
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/reviews", Routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
