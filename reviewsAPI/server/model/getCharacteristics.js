const sqlDb = require("../mySQL");
const async = require("async");

module.exports = (req, res, product_id, callback) => {
  let sql = `SELECT *
  FROM chara_list
  WHERE product_id = ${product_id}`;

  sqlDb.query(sql, function(err, result) {
    if (err) callback(err, "fail to get characteristic data out");
    else {
      let obj = {};
      let value = [];

      async.forEachOf(
        result,
        (ele, i, in_CB) => {
          let sql2 = `SELECT value_ FROM characteristics 
        WHERE characteristic_id = ${ele["id"]}`;
          sqlDb.query(sql2, function(err, result2) {
            if (err) {
              in_CB(err);
            } else {
              let sum = 0;
              for (let i = 0; i < result2.length; i++) {
                sum += result2[i].value_;
              }
              let avg = sum / result2.length;
              value.push(avg);
              in_CB(null);
            }
          });
        },
        function(err) {
          if (err) callback(err, "date");
          else {
            for (let i = 0; i < result.length; i++) {
              obj[result[i].name_] = { id: result[i].id };
              obj[result[i].name_].value = value[i].toString();
            }
            callback(null, obj);
          }
        }
      );
    }
  });
};
