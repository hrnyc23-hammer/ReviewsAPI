const mongoose = require("mongoose");
const {
  reviewsSchema,
  photoSchema,
  characteristicSchema
} = require("./mongDB_schemas.js");

if (process.env.MONGODB_URI) {
  console.log("process.env.MONGODB_URI________:  False ");
  mongoose.connect(process.env.MONGODB_URI);
} else {
  console.log("process.env.MONGODB_URI________:  true ");
  mongoose.connect("mongodb://localhost:27017/reviews", {
    useNewUrlParser: true
  });
}

const db = mongoose.connection;

// mongoose.Promise = Promise;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to db...");
});

var reviewsModel = mongoose.model("reviewsModel", reviewsSchema);
var photoModel = mongoose.model("photoModel", photoSchema);
var charModel = mongoose.model("charModel", characteristicSchema);

module.exports.reviewsModel = reviewsModel;
module.exports.photoModel = photoModel;
module.exports.charModel = charModel;
module.exports.db = db;
// module.exports.reviewsModel = reviewsModel;
// module.exports.ratingModel = ratingModel;
