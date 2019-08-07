const sqlDb = require("./mySQL");
// const Promise = require("promise");
// const {promisify} = require('util')
const moment = require("moment");
const async = require("async");

module.exports = {
  getReviews: (req, res, product_id, callback) => {
    let sql = `SELECT * FROM reviews 
      WHERE reviews.product_id = ${product_id} 
      AND reported != 1 LIMIT 5`;

    sqlDb.query(sql, function(err, result) {
      if (err) callback(null, "fail to get reviews data out");
      else {
        let returnObj = { product: product_id, page: 1, count: 5 };
        let photos = [];
        // console.log("value i: testing");
        async.forEachOf(
          result,
          (ele, i, in_CB) => {
            let sql2 = `SELECT id, review_url FROM review_photo
            WHERE reviews_id = ${ele.reviews_id}`;

            console.log("value i: testing 2 with reviews_id: ", i);

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

    // multiple select
    // let sql = `SELECT value_, review_url
    //   FROM characteristics, review_photo
    //   WHERE characteristics.id = review_photo.id AND review_id = ${product_id} `;

    // sqlDb.query(sql, function(err, result) {
    //   if (err) callback(err, "fail to get data out");
    //   else {
    //     let returnObj = {};
    //     callback(null, result);
    //   }
    // });
  },

  getRatings: (req, res, product_id, callback) => {
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
  },

  getCharacteristics: (req, res, product_id, callback) => {
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

        // let sql2 = `SELECT value_ FROM characteristics WHERE characteristics.id = ${product_id}`;
        // sqlDb.query(sql2, function(err, result2) {
        //   if (err) callback(err, "fail to get data out");
        //   else {
        //     callback(null, result2);
        //     // value.push(result2);
        //     // return result2;
        //   }
        // });
        // callback(null, value);
      }
    });

    // let sql = `SELECT value_, review_url
    //   FROM characteristics, review_photo
    //   WHERE characteristics.id = review_photo.id AND review_id = ${product_id} `;

    // sqlDb.query(sql, function(err, result) {
    //   if (err) callback(err, "fail to get data out");
    //   else {
    //     let returnObj = {};
    //     callback(null, result);
    //   }
    // });
  },

  //TODO: need change
  postReviews: (req, res, product_id, callback) => {
    // let { reviews_id, review_url } = req.body;
    // insertToPhoto(reviews_id, review_url, callback);

    // let { characteristic_id, reviews_id, value_ } = req.body;
    // insertToChara(characteristic_id, reviews_id, value_, callback);

    let {
      rating,
      summary,
      body,
      recommend,
      reported,
      reviewer_name,
      reviewer_email,
      response,
      helpfulness,
      review_date
    } = req.body;

    review_date = review_date ? review_date : moment().format("YYYY-MM-DD");

    let arr = [
      product_id,
      rating,
      summary,
      body,
      recommend,
      reported,
      reviewer_name,
      reviewer_email,
      response,
      helpfulness,
      review_date
    ];
    // res.send(newdat);
    // insertToReviews(arr, callback);
  },

  putHelpfulness: (req, res, review_id, callback) => {
    let sql = `UPDATE reviews SET helpfulness = helpfulness +1 
              WHERE reviews_id = ${review_id}`;
    sqlDb.query(sql, err => {
      if (err) callback(err);
      else callback(null);
    });
  },

  putReport: (req, res, review_id) => {},

  createReviews: (req, res) => {}
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

// const insertToReviews = (arr, callback) => {
//   let sql = `INSERT INTO reviews ( product_id, rating, summary, body,  recommend,reported,
//     reviewer_name,reviewer_email,response, helpfulness,review_date ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   sqlDb.query(sql, arr, function(err, result) {
//     if (err) callback(err, "fail to insert");
//     else callback(null, "1 record inserted ");
//   });
// };

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
