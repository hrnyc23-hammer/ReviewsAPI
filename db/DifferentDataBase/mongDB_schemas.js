const mongoose = require("mongoose");

//id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
const reviewsSchema = new mongoose.Schema(
  {
    review_id: { type: Number, unique: true },
    product_id: { type: Number, required: true },
    rating: Number,
    date: { type: Date, default: Date.now }, //TODO: insert current data
    summary: String,
    body: String,
    recommend: Boolean,
    reported: Boolean,
    reviewer_name: String,
    reviewer_email: { type: String, unique: true },
    response: String,
    helpfulness: Number
  },
  { autoIndex: false }
);

const photoSchema = new mongoose.Schema({
  review_id: Number,
  url: String
});

const characteristicSchema = new mongoose.Schema({
  characteristic_id: Number,
  review_id: Number,
  value: Number
});

module.exports.reviewsSchema = reviewsSchema;
module.exports.photoSchema = photoSchema;
module.exports.characteristicSchema = characteristicSchema;
