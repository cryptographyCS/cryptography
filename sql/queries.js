const ADD_USER = 'INSERT INTO users (username, password, last_active, email) VALUES ($1, $2, $3, $4) RETURNING *;';
const GET_USER = 'SELECT * FROM users WHERE username = $1;';
const GET_EXCHANGE = 'SELECT * FROM exchanges WHERE name = $1;';
const GET_USER_EXCHANGES = 'SELECT e.name, ue.api_key, ue.api_secret FROM users_exchanges ue JOIN exchanges e ON e._id = ue.exchange_id JOIN users u ON u._id = ue.user_id WHERE u.username = $1;';
const ADD_USER_EXCHANGE = 'INSERT INTO users_exchanges (exchange_id, user_id, api_key, api_secret) VALUES ((SELECT _id FROM exchanges WHERE name = $1), (SELECT _id FROM users WHERE username = $2), $3, $4);';

module.exports = {
  ADD_USER,
  GET_USER,
  GET_EXCHANGE,
  GET_USER_EXCHANGES,
  ADD_USER_EXCHANGE,
}
