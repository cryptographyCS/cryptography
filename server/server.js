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
const binanceController = require('./controllers/binanceController');

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

// route for coinbase redirectURI on Oauth success
app.get('/coinbase/redirect', apiController.coinbase_getToken, (req, res) => {
  res.redirect(path.resolve('/'));
});

//get request redirects to page that lets user input APIKEY and APISECRET
//on button press, make post request
// post request APIKEY and SECRETKEY

// app.get('/binance/auth', (req, res) => {
//
// })

app.post('/binance/auth', (req, res) => {
  // console.log(binanceController.binance.options);
})

// insert middleware call to the database!
// app.get('/coinbase/read', apiController.coinbase_read);

app.listen(3000, () => console.log('Server listening on port 3000'));
