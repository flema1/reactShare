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

-- DROP TABLE users_shares;
-- CREATE TABLE IF NOT EXISTS users_shares (
--   id BIGSERIAL PRIMARY KEY,
--   user_id INTEGER REFERENCES users(id),
--   code_id INTEGER REFERENCES shares(id)
-- );


