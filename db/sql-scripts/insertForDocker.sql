-- LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/csv/reviews_photos.csv' 
LOAD DATA LOCAL INFILE '../../review_files/reviews_photos.csv' 
INTO TABLE review_photo 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/csv/reviews.csv' 
LOAD DATA LOCAL INFILE '../../review_files/reviews.csv' 
INTO TABLE reviews 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
-- id,product_id,rating,date,summary,body,recommend,
-- reported,reviewer_name,reviewer_email,response,helpfulness
-- (id,product_id,rating,review_date,summary,body,@recommend,@reported,reviewer_name,reviewer_email,response,helpfulness)
-- -- (PermitId,FirstName,LastName,MiddleInitial,@DisplayFlag)
--   SET recommend = (@recommend = true);
--   SET reported = (@reported = true);

-- LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/csv/characteristic_reviews.csv' 
LOAD DATA LOCAL INFILE '../../review_files/characteristic_reviews.csv' 
INTO TABLE characteristics 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- LOAD DATA LOCAL INFILE '/docker-entrypoint-initdb.d/csv/characteristics.csv' 
LOAD DATA LOCAL INFILE '../../review_files/characteristics.csv' 
INTO TABLE chara_list 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;