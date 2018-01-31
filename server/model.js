require('dotenv').config();
const { Pool } = require('pg');

const USER = process.env.DB_USER;
const PASS = process.env.DB_PASS;
const DATABASE = process.env.DB_USER; // DB name is the same as the username by default
const PORT = 5432;

const pool = new Pool({
  user: USER,
  database: DATABASE,
  password: PASS,
  host: 'baasu.db.elephantsql.com',
  port: PORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}