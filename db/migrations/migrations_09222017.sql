DROP DATABASE reactshare_dev;
CREATE DATABASE reactshare_dev;
 \c reactshare_dev;




DROP TABLE users;
CREATE TABLE  users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_digest TEXT NOT NULL,
  firstname VARCHAR(255),
  token VARCHAR NOT NULL
);

