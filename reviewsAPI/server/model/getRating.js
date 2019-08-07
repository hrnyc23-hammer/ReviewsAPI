const sqlDb = require("../mySQL");
const async = require("async");

module.exports = (req, res, product_id, callback) => {
  let sql = `SELECT rating, recommend
    FROM reviews
    WHERE product_id = ${product_id} `;

  sqlDb.query(sql, function(err, result) {
    if (err) callback(err, "fail to get rating data out");
    else {
      let obj = {};
      let recomObj = {};
      for (let i = 0; i < result.length; i++) {
        if (obj[result[i].rating]) obj[result[i].rating]++;
        else obj[result[i].rating] = 1;
        if (recomObj[result[i].recommend]) recomObj[result[i].recommend]++;
        else recomObj[result[i].recommend] = 1;
      }
      let newObj = {};
      newObj.rating = obj;
      newObj.recommend = recomObj;
      callback(null, newObj);
    }
  });
};
