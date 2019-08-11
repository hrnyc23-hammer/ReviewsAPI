const sqlDb = require("../mySQL");
const async = require("async");
const moment = require("moment");

module.exports = (req, res, product_id, callback) => {
  let { rating, summary, body, recommend } = req.body;
  let { name, email, photos, characteristics } = req.body;

  let review_date = moment().format("YYYY-MM-DD");
  let response = "";
  let id_review;

  let arrR = [product_id, rating, summary, body, recommend, name];
  arrR.push(email, response, review_date);

  async.series(
    [
      function(callB) {
        let sql = `INSERT INTO reviews ( product_id, rating, summary, body,  recommend,
            reviewer_name,reviewer_email,response,review_date )
            VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        sqlDb.query(sql, arrR, function(err, result) {
          if (err) callB(err, "fail to insert");
          else {
            id_review = result.insertId;
            callB(null);
          }
        });
      },
      function(callB) {
        let sql2 = `INSERT INTO review_photo (reviews_id,review_url) VALUES ( ?, ?)`;
        async.forEachOf(
          photos,
          (ele, i, in_CB) => {
            sqlDb.query(sql2, [id_review, ele], function(err, result) {
              if (err) in_CB(err, "fail to insert");
              else in_CB(null, "1 record inserted ");
            });
          },
          function(err, infor) {
            if (err) callB(err, infor);
            else callB(null);
          }
        );
      },
      function(callB) {
        let sql2 = `INSERT INTO characteristics 
                    (characteristic_id, review_id, value_) 
                    VALUES ( ?, ?, ?)`;
        async.forEachOf(
          characteristics,
          (ele, key, in_CB) => {
            let queryArr = [Number(key), id_review, ele];
            sqlDb.query(sql2, queryArr, err => {
              if (err) in_CB(err, "fail to insert");
              else in_CB(null, "1 record inserted ");
            });
          },
          function(err, infor) {
            if (err) callB(err, infor);
            else callB(null);
          }
        );
      }
    ],
    function(err, infor) {
      if (err) callback(err, infor);
      else callback(null, "1 record inserted ");
    }
  );
};
