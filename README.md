# ratings-and-reviews

create api for ratings-and-reviews on greenfield project

## Install npm

npm i

<!-- ## Start MongoDB Server

if run into shutting down with code:100
exception in initAndListen: NonExistentPath: Data directory /data/db not found., terminating

whoami = YOURUSERNAME
sudo mkdir -p /data/db
sudo chown -Rv YOURUSERNAME /data/db

mongod

mongo -->

## set up MySQL database

Locate your schema.sql file then run following command to create mysql database

mysql -username -password
source /home/user/..../db/sql-scripts/createDatabase.sql

import csv data into mysql database
source /home/user/..../db/sql-scripts/insertForDocker.sql


create config.js file in ./reviewsAPI

## Install and Start redis server

Ubuntu system:
    $ sudo apt update
    $ sudo apt install redis-server

Start Redis:
    $ redis-server


## Start Server
Start Server:
   $ Run npm start in ./reviewsAPI

