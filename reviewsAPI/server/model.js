const sqlDb = require("./mySQL");
const moment = require("moment");
const async = require("async");

module.exports = {
  //TODO: need change
  // postReviews: (req, res, product_id, callback) => {
  // let { reviews_id, review_url } = req.body;
  // insertToPhoto(reviews_id, review_url, callback);
  // let { characteristic_id, reviews_id, value_ } = req.body;
  // insertToChara(characteristic_id, reviews_id, value_, callback);
  //   let {
  //     rating,
  //     summary,
  //     body,
  //     recommend,
  //     name,
  //     email,
  //     photos,
  //     characteristics
  //   } = req.body;
  //   let review_date = moment().format("YYYY-MM-DD");
  //   let response = "";
  //   let arr = [
  //     product_id,
  //     rating,
  //     summary,
  //     body,
  //     recommend,
  //     name,
  //     email,
  //     response,
  //     review_date
  //   ];
  //   // res.send(newdat);
  //   // insertToReviews(arr, callback);
  //   async.parallel(
  //     [
  //       function(callB) {
  //         let sql = `INSERT INTO reviews ( product_id, rating, summary, body,  recommend,
  //         reviewer_name,reviewer_email,response,review_date )
  //         VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  //         sqlDb.query(sql, arr, function(err, result) {
  //           if (err) callB(err, "fail to insert");
  //           else callB(null);
  //         });
  //       }
  //       // function(callB) {
  //       //   let sql2 = `INSERT INTO reviews ( product_id, rating, summary, body,  recommend,
  //       //     reviewer_name,reviewer_email,response,review_date ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  //       //   sqlDb.query(sql2, arr, function(err, result) {
  //       //     if (err) callB(err, "fail to insert");
  //       //     else {
  //       //       callB(null, "1 record inserted ");
  //       //     }
  //       //   });
  //       // }
  //     ],
  //     function(err, infor) {
  //       if (err) callback(err, infor);
  //       else callback(null, "1 record inserted ");
  //     }
  //   );
  //   // optional callback)
  // }
};

const findPhoto = async reviews_id => {
  // return new Promise((resolve, reject) => {
  let data;
  let sql = `SELECT id, review_url FROM reviews WHERE reviews_id = ${reviews_id}`;
  await sqlDb.query(sql, function(err, result) {
    if (err) data = "fail to get review photo_url";
    else data = result;
    return result;
  });
  return data;

  // });
  // .then(data => {
  //   return data;
  // })
  // .catch(err => {
  //   return err;
  // });

  // return promise;
};

// const insertToPhoto = (reviews_id, review_url, callback) => {
//   let sql = `INSERT INTO review_photo ( reviews_id, review_url) VALUES ( ?, ?)`;
//   sqlDb.query(sql, [reviews_id, review_url], function(err, result) {
//     if (err) callback(err, "fail to insert");
//     else callback(null, "1 record inserted ");
//   });
// };

// const insertToChara = (chara_id, reviews_id, value_, callback) => {
//   let sql = `INSERT INTO characteristics ( characteristic_id, review_id, value_) VALUES ( ?, ?, ?)`;
//   sqlDb.query(sql, [chara_id, reviews_id, value_], function(err, result) {
//     if (err) callback(err, "fail to insert");
//     else callback(null, "1 record inserted ");
//   });
// };

const insertToReviews = (arr, callback) => {
  let sql = `INSERT INTO reviews ( product_id, rating, summary, body,  recommend,reported,
    reviewer_name,reviewer_email,response, helpfulness,review_date ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  sqlDb.query(sql, arr, function(err, result) {
    if (err) callback(err, "fail to insert");
    else callback(null, "1 record inserted ");
  });
};

//id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
//1,1,5,"2019-01-01","This product was great!",

// const mongoose = require("mongoose");
// const { db, reviewsModel, photoModel, charModel } = require("../db/mongDB.js");
//"I really did or did not like this product based on whether it was sustainably sourced.  Then I found out that its made from nothing at all.",

//true,false,"funtime","first.last@gmail.com",,8
//

/*reviewsModel
.findOneAndUpdate(
  { id: id },
  {
    id: id,
    backdrop_path: backdrop_path,
    poster_path: poster_path,
    release_date: release_date,
    vote_average: vote_average,
    title: title
  },
  { upsert: true }
)
.exec()
.then(data => {
  console.log("data from findOne and updata: ", data);
}); */

// let sql = `SELECT reviews_id FROM review_photo WHERE id = ${product_id}`;
// sqlDb.query(sql, function(err, result) {
//   if (err) callback(err, "fail to get data out");
//   else callback(null, result);
// });

// let sql = `SELECT value_ FROM characteristics WHERE id = ${product_id}`;
// sqlDb.query(sql, function(err, result) {
//   if (err) callback(err, "fail to get data out");
//   else callback(null, result);
// });
