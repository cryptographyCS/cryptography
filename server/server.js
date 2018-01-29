const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const pg = require('pg');

const authController = require('./controllers/authController');
const apiController = require('./controllers/apiController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, 'build')));

app.listen(3000);