const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cookieController = require('./controllers/cookieController');
const authController = require('./controllers/authController');
const apiController = require('./controllers/apiController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../build')));
app.use(cookieController.checkForCookie);

app.post('/api/login',
  authController.getUser,
  authController.validateUser,
  cookieController.addCookie,
  (req, res) => {
    res.json(res.locals.result);
});

app.post('/api/signup',
  authController.signup,
  cookieController.addCookie,
  (req, res) => {
    res.json(res.locals.result);
});

app.get('/api/logout', 
  cookieController.clearCookie, 
  (req, res) => {
    res.end();
});

app.get('/api/update')
app.post('/api/addExchange')

// route for coinbase OAuth
app.get('/coinbase/auth', (req, res) => {
  res.redirect(apiController.coinbase_authURL);
})

// route for coinbase redirectURI
app.get('/coinbase/redirect', apiController.coinbase_getToken, (req, res) => {
  res.redirect(path.resolve('/'));
});

app.listen(3000, () => console.log('Server listening on port 3000'));
