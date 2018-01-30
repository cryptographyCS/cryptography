const db = require('../model');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const authController = {};

authController.signup = (req, res, next) => {
  const password = bcrypt.hashSync(req.body.password, SALT_WORK_FACTOR);
  const date = new Date().toISOString();
  db.query(
    'INSERT INTO users (username, password, last_active) VALUES ($1, $2, $3) RETURNING *;',
    [req.body.username, password, date]
  ).then(data => { 
      console.log(data);
      next();
    }
  ).catch(err => console.error('Error creating user', err.stack));
};

authController.getUser = (req, res, next) => {
  db.query(
    'SELECT * FROM users WHERE username = $1',
    [req.body.username]
  )
  .then(result => {
    res.locals.dbUser = result.rows[0];
    next();
  })
  .catch(err => console.error('Error getting user:', err));
};

authController.validateUser = (req, res, next) => {
  const user = res.locals.dbUser;
  if (!user || !(bcrypt.compareSync(req.body.password, user.password))) {
    console.error('user was not validated');
    res.status(401).end();
  } else {
    next();
  }
};

module.exports = authController;
