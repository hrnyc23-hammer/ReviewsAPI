const getReviewsList = require("./model/getReviews.js");
const getRatings = require("./model/getRating.js");
const postReviews = require("./model/postReviews");
const getCharacteristics = require("./model/getCharacteristics.js");
const { putHelpfulness, putReport } = require("./model/putReq.js");
const cache = require("./model/redisCache.js");

module.exports = {
  //get review list from database
  getReviews: (req, res, product_id) => {
    //run redis cache before query on database
    cache.get(product_id, (err, data) => {
      if (err) res.send(500);
      if (data) {
        console.log("product_id:", product_id, " data: ", data);
        res.send(JSON.parse(data));
      } else {
        //run query function on database
        getReviewsList(req, res, product_id, (err, data) => {
          if (err) res.status(500).send("fail to get data");
          else {
            console.log("data before cache: ", data);
            data = JSON.stringify(data);
            //set redis cache
            cache.set(product_id, data, err => {
              if (err) res.send(500);
              else {
                cache.expire(product_id, 20);
                res.send(JSON.parse(data));
              }
            });
          }
        });
      }
    });
  },

  //get data for meta
  getMeta: (req, res, product_id) => {
    //run redis cache before query on database
    cache.get(product_id + "M", (err, meta) => {
      if (err) res.send(500);
      if (meta) {
        console.log("meta: ", meta);
        res.send(JSON.parse(meta));
      } else {
        //get ratings from reviews database table
        getRatings(req, res, product_id, (err, obj1) => {
          if (err) res.status(500);
          else {
            //get characteristics on characteristics database table
            getCharacteristics(req, res, product_id, (err, charac) => {
              if (err) res.status(500);
              else {
                let sendObj = {
                  product_id: product_id,
                  ratings: obj1.rating,
                  recommended: obj1.recommend,
                  characteristics: charac
                };
                meta = JSON.stringify(sendObj);
                //set redis cache after data query from database
                //and send data back to client
                cache.set(product_id + "M", meta, err => {
                  if (err) res.send(500);
                  else {
                    cache.expire(product_id + "M", 20);
                    res.send(JSON.parse(meta));
                  }
                });
              }
            });
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
};
