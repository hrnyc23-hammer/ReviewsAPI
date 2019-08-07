const getReviewsList = require("./model/getReviews.js");
const getRatings = require("./model/getRating.js");
const postReviews = require("./model/postReviews");
const getCharacteristics = require("./model/getCharacteristics.js");
const { putHelpfulness, putReport } = require("./model/putReq.js");

module.exports = {
  getReviews: (req, res, product_id) => {
    getReviewsList(req, res, product_id, (err, data) => {
      if (err) res.status(500).send("fail to get data");
      else res.send(data);
    });
  },

  getMeta: (req, res, product_id) => {
    getRatings(req, res, product_id, (err, obj1) => {
      if (err) res.status(500);
      else {
        getCharacteristics(req, res, product_id, (err, charac) => {
          if (err) res.status(500);
          else {
            let sendObj = {
              product_id: product_id,
              ratings: obj1.rating,
              recommended: obj1.recommend,
              characteristics: charac
            };
            res.send(sendObj);
          }
        });
      }
    });
  },

  postReviews: (req, res, product_id) => {
    postReviews(req, res, product_id, (err, data) => {
      if (err) res.status(500).send(data);
      else res.status(201).send(data);
    });
  },

  putHelpfulness: (req, res, review_id) => {
    putHelpfulness(req, res, review_id, err => {
      if (err) res.status(500);
      else res.sendStatus(200);
    });
  },
  putReport: (req, res, review_id) => {
    putReport(req, res, review_id, err => {
      if (err) res.status(500);
      else res.sendStatus(200);
    });
  }

  // createReviews: (req, res) => {}
};
