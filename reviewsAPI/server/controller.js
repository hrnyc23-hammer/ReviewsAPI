const { getReviews, getRatings, postReviews } = require("./model.js");
const { putHelpfulness, putReport, getCharacteristics } = require("./model.js");
const model = require("./model.js");

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

  getMeta: (req, res, product_id) => {
    getRatings(req, res, product_id, (err, obj1) => {
      if (err) {
        res.status(500);
      } else {
        getCharacteristics(req, res, product_id, (err, charac) => {
          if (err) {
            res.status(500);
          } else {
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
        // console.log(err);
      } else {
        res.sendStatus(200);
      }
    });
  },

  createReviews: (req, res) => {}
};
