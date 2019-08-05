const { getReviews, getRatings, postReviews } = require("./model.js");
const { putHelpfulness, putReport } = require("./model.js");

module.exports = {
  getReviews: (req, res, product_id) => {
    getReviews(req, res, product_id, (err, data) => {
      if (err) {
        res.status(500).send("fail to get data");
      } else {
        res.send(data);
      }
    });
  },

  getRatings: (req, res, product_id) => {
    getRatings(req, res, product_id, (err, data) => {
      if (err) {
        res.status(500);
      } else {
        res.send(data);
      }
    });
  },

  postReviews: (req, res, product_id) => {
    postReviews(req, res, product_id, (err, data) => {
      if (err) {
        res.status(500);
        console.log(err);
      } else {
        res.send(data);
      }
    });
  },

  putHelpfulness: (req, res, review_id) => {
    putHelpfulness(req, res, review_id, (err, data) => {
      if (err) {
        res.status(500);
        console.log(err);
      } else {
        res.send(data);
      }
    });
  },
  putReport: (req, res, review_id) => {
    putReport(req, res, review_id, (err, data) => {
      if (err) {
        res.status(500);
        console.log(err);
      } else {
        res.send(data);
      }
    });
  },

  createReviews: (req, res) => {}
};
