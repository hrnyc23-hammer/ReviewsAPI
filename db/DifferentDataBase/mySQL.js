const mysql = require("mysql");
const mysqlConfig = require("../config.js");

const connection = mysql.createConnection(mysqlConfig);

connection.connect(err => {
  if (err) console.log("fail to connect mysql database");
  else {
    console.log("succuss connect to database!");
  }

  // connection.query("CREATE DATABASE IF NOT EXISTS reviewsAPI", err => {
  //   if (err) console.log("fail create a database of reviewsAPI");
  //   else console.log("success create a database of reviewsAPI");
  // });

  // connection.query(`CREATE TABLE IF NOT EXISTS reviewList (
  //   product_id int NOT NULL AUTO_INCREMENT,
  //   ratings VARCHAR(255) DEFAULT NULL,
  //   recommended VARCHAR(255) DEFAULT NULL,
  //   characteristics VARCHAR(255) DEFAULT NULL,
  //   PRIMARY KEY (product_id)
  //   )`), (err)=>{
  //     if(err) console.log('fail to create table reviewList')
  //     else console.log('success to creat table reviewList')
  //   }
});
module.exports = connection;
