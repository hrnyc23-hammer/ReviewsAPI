LOAD DATA LOCAL INFILE '/Users/noname/Documents/review_files/photoTest.csv' 
INTO TABLE review_photo 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/Users/noname/Documents/review_files/reviewsTest.csv' 
INTO TABLE reviews 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/Users/noname/Documents/review_files/charaTest.csv' 
INTO TABLE characteristics 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
