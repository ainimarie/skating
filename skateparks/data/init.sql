CREATE DATABASE parkit;

  use parkit;

  CREATE TABLE parks (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    parkName VARCHAR(30) NOT NULL,
    latitude FLOAT(22) NOT NULL,
    longitude FLOAT(22) NOT NULL,
    imgUrl VARCHAR(50),
    description VARCHAR(400),
    date TIMESTAMP
  );