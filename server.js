const express = require("express");
const bodyParser = require("body-parser");
const {reviewsList, ratings} = require('./exampleDB.js')
// const morgan = require("morgan");

const path = require("path");

// An instance of express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan("dev"));

// app.get('*/bundle.js', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'bundle.js'), (err) => {
//     if (err) {
//       res.sendStatus(500);
//     }
//   });
// });

//GET /reviews/:product_id/list
app.get("/reviews/1/list", (req, res) => {
  res.send(reviewsList)
});

//GET /reviews/:product_id/meta
app.get("/reviews/1/meta", (req, res) => {
  res.send(ratings)
});

//POST /reviews/:product_id
//PUT /reviews/helpful/:review_id
//PUT /reviews/report/:review_id

// // Catch all incase user refreshes on react-router handled url
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'), (err) => {
//     if (err) {
//       res.sendStatus(500);
//     }
//   });
// });




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
