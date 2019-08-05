DROP DATABASE IF EXISTS reviewAPI;

CREATE DATABASE IF NOT EXISTS reviewAPI;

USE reviewAPI;

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  reviews_id INTEGER AUTO_INCREMENT,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL DEFAULT 0,
  review_date VARCHAR(50) NOT NULL,
  summary VARCHAR(200) NULL DEFAULT NULL,
  body VARCHAR(200) NULL DEFAULT NULL,
  recommend INTEGER NULL DEFAULT 0,
  reported INTEGER NULL DEFAULT 0,
  reviewer_name VARCHAR(50) NOT NULL,
  reviewer_email VARCHAR(200) NULL DEFAULT NULL,
  response VARCHAR(200) NOT NULL,
  helpfulness INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (reviews_id)
);


DROP TABLE IF EXISTS review_photo;
    
CREATE TABLE review_photo (
  id INTEGER AUTO_INCREMENT,
  reviews_id INTEGER NOT NULL,
  review_url VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);


DROP TABLE IF EXISTS characteristics;
    
CREATE TABLE characteristics (
  id INTEGER AUTO_INCREMENT,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value_ INTEGER NOT NULL,
  PRIMARY KEY (id)
);


-- ALTER TABLE `reviews` ADD FOREIGN KEY (product_id) REFERENCES `productId` (`id`);
-- ALTER TABLE `reviews` ADD FOREIGN KEY (email) REFERENCES `email` (`id`);
-- ALTER TABLE `reviews` ADD FOREIGN KEY (characteristics) REFERENCES `characteristics` (`id`);
