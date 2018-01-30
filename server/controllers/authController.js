const db = require('../model');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const authController = {};

authController.signup = (req, res, next) => {
  const password = bcrypt.hashSync(req.body.password, SALT_WORK_FACTOR);
  const date = Date.now();
  db.query(
    'INSERT INTO users (username, password, paid_account, created, last_active) VALUES ($1, $2, $3, $4, $4) RETUNING *',
    [req.body.username, password, false, date]
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
  .then(data => {
    res.locals.dbUser = data;
    next();
  })
  .catch(err => console.error('Error getting user:', err));
};

authController.validateUser = (req, res, next) => {
  console.log('Validate User')
  res.send('Validate User');
};

module.exports = authController;
