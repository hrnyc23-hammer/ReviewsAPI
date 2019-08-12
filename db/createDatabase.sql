DROP DATABASE IF EXISTS reviewapi;

CREATE DATABASE IF NOT EXISTS reviewapi;

USE reviewapi;

DROP TABLE IF EXISTS reviews;
-- id,product_id,rating,date,summary,body,recommend,
-- reported,reviewer_name,reviewer_email,response,helpfulness
CREATE TABLE reviews (
  reviews_id INTEGER AUTO_INCREMENT,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL DEFAULT 0,
  review_date VARCHAR(50) NOT NULL,
  summary VARCHAR(200) NULL DEFAULT NULL,
  body VARCHAR(200) NULL DEFAULT NULL,
  recommend BOOLEAN NOT NULL DEFAULT 0,
  reported BOOLEAN NOT NULL DEFAULT 0,
  reviewer_name VARCHAR(50) NOT NULL,
  reviewer_email VARCHAR(200) NULL DEFAULT NULL,
  response VARCHAR(200) NOT NULL,
  helpfulness INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (reviews_id),
  INDEX (product_id) 
);


DROP TABLE IF EXISTS review_photo;
    
CREATE TABLE review_photo (
  id INTEGER AUTO_INCREMENT,
  reviews_id INTEGER NOT NULL,
  review_url VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  INDEX (reviews_id)
);


DROP TABLE IF EXISTS characteristics;
    
CREATE TABLE characteristics (
  id INTEGER AUTO_INCREMENT,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value_ INTEGER NOT NULL,
  PRIMARY KEY (id),
  INDEX (review_id),
  INDEX (characteristic_id)
);
-- id,product_id,name

DROP TABLE IF EXISTS chara_list;

CREATE TABLE chara_list (
  id INTEGER AUTO_INCREMENT,
  product_id INTEGER NOT NULL,
  name_ VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  INDEX (product_id)
);

-- ALTER TABLE `review_photo` ADD FOREIGN KEY (reviews_id) REFERENCES `reviews` (`reviews_id`);

-- ALTER TABLE `reviews` ADD FOREIGN KEY (characteristics) REFERENCES `characteristics` (`id`);
-- ALTER TABLE `reviews` ADD FOREIGN KEY (email) REFERENCES `email` (`id`);
