const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const pg = require('pg');
const request = require('request');

const authController = require('./controllers/authController');
const apiController = require('./controllers/apiController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../', 'build')));

//route for coinbase OAuth
app.get('/auth', (req, res) => {
  res.redirect(apiController.coinbase_API_authURL);
})

app.listen(3000, () => 'listening on 3000');
