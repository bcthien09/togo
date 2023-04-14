#!/bin/sh
DB="todos_test"

echo "Creating database todos_test"

docker exec -it MySQL mysql -uroot -proot -e "
    DROP DATABASE IF EXISTS $DB;
    DROP DATABASE IF EXISTS todos;
    CREATE DATABASE $DB CHARACTER SET utf8 COLLATE utf8_general_ci;
    USE $DB;
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255),
        password VARCHAR(255),
        max_todo INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )  ENGINE=INNODB;

    CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )  ENGINE=INNODB;
"
echo "End create database todos_test";
