const db = require('../db/config');

const User = {};

User.findByUserName = userName => {
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE username = $1
  `, [userName]);
};

User.create = user => {
   console.log (" model - User.create = user  ---->");
  return db.one(`
    INSERT INTO users
    (username, email, password_digest, firstname, token)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `, [user.username, user.email, user.password_digest, user.firstname, user.token]);
};

User.findUserEnvi = id => {
  return db.manyOrNone(`
    SELECT * FROM sight_log
    WHERE user_id = $1
  `, [id]);
};

User.findByToken = token => {
   console.log (" users model. get username  ---->");
  return db.oneOrNone(`
    SELECT username FROM users
    WHERE token = $1
  `, [token]);
};

module.exports = User;