-- CREATE DATABASE todos_dev;
 \c reactshare_dev;
 
DROP TABLE shares;
CREATE TABLE IF NOT EXISTS shares (
  id SERIAL PRIMARY KEY,
  home_user VARCHAR(50),
  peer_user VARCHAR(50),
  code      TEXT,
  _date     TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);




