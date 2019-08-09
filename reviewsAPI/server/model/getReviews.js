const sqlDb = require("../mySQL");
const async = require("async");
// const cache = require("./cache");

module.exports = (req, res, product_id, callback) => {
  // cache.get(name, (err, age) => {
  //   if (age !== null) return callback(age);
  // });

  let sql = `SELECT * FROM reviews 
        WHERE product_id = ${product_id} 
        AND reported = 0  
        LIMIT 5`;

  sqlDb.query(sql, function(err, result) {
    if (err) callback(null, "fail to get reviews data out");
    else {
      let returnObj = { product: product_id, page: 1, count: 5 };
      let photos = [];
      async.forEachOf(
        result,
        (ele, i, in_CB) => {
          let sql2 = `SELECT id, review_url FROM review_photo
              WHERE reviews_id = ${ele.reviews_id}`;

          sqlDb.query(sql2, function(err, result2) {
            if (err) in_CB(err, "fail to get photo data out");
            else {
              for (let i = 0; i < result2.length; i++) {
                result2[i].url = result2[i].review_url;
                delete result2[i].review_url;
              }
              photos.push(result2);
              in_CB(null);
            }
          });
        },
        function(err, infor) {
          if (err) callback(null, infor);
          else {
            for (let i = 0; i < result.length; i++) {
              delete result[i].product_id;
              result[i].data = result[i].review_date + "T00:00:00.000Z";
              delete result[i].review_date;
              result[i].photos = photos[i];
              delete result[i].reviewer_email;
            }
            returnObj.results = result;
            callback(null, returnObj);
          }
        }
      );
    }
  });
};
