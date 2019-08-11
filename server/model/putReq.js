const sqlDb = require("../mySQL");

module.exports = {
  putHelpfulness: (req, res, review_id, callback) => {
    let sql = `UPDATE reviews SET helpfulness = helpfulness +1 
                  WHERE reviews_id = ${review_id}`;
    sqlDb.query(sql, err => {
      if (err) callback(err);
      else callback(null);
    });
  },

  putReport: (req, res, review_id, callback) => {
    let sql = `UPDATE reviews SET reported = 1 
                  WHERE reviews_id = ${review_id}`;
    sqlDb.query(sql, err => {
      if (err) callback(err);
      else callback(null);
    });
  }
};
