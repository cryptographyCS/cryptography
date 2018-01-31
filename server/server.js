const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const bcrypt = require('bcrypt');
const pg = require('pg');
const request = require('request');


const authController = require('./controllers/authController');
const apiController = require('./controllers/apiController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../build')));

app.post('/api/login',
  authController.getUser,
  authController.validateUser,
  (req, res) => {
    res.json(res.locals.result);
});

app.post('/api/signup',
  authController.signup,
  (req, res) => {
    res.json(res.locals.result);
});

// route for coinbase OAuth
app.get('/coinbase/auth', (req, res) => {
  res.redirect(apiController.coinbase_authURL);
})

// route for coinbase redirectURI
app.get('/coinbase/redirect', apiController.coinbase_getToken, (req, res) => {
  res.redirect(path.resolve('/'));
});

app.listen(3000, () => console.log('Server listening on port 3000'));
