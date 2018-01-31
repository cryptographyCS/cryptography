const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

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

app.listen(3000, () => console.log('Server listening on port 3000'));