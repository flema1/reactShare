
const pgp = require('pg-promise')();

let db;

if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  db = pgp({
    database: 'reactshare_dev',
    //database: 'adaquote_development',
    port: 5432,
    host: 'localhost',
    https: true
  });
} else if (process.env.NODE_ENV === 'production') {
  db = pgp(process.env.DATABASE_URL);
}

module.exports = db;