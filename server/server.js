const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const bcrypt = require('bcrypt');
const pg = require('pg');
const request = require('request');
const url = require('url');
// const coinbase = require('coinbase');
const Client = require('coinbase').Client;

const authController = require('./controllers/authController');
const apiController = require('./controllers/apiController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../', 'build')));

// route for coinbase OAuth
app.get('/coinbase/auth', (req, res) => {
  res.redirect(apiController.coinbase_API_authURL);
})

// route for coinbase redirectURI
app.get('/coinbase/redirect', (req, res) => {

  // reroute with router
  res.redirect(path.resolve(__dirname, '../', '/build', '/index.html'));

  // redirect URI query string
  const queryData = url.parse(req.url, true).query;

  // credentials needed for token
  const opts = {
    "grant_type": "authorization_code",
    "code": `${queryData.code}`,
    "client_id": process.env.COINBASE_CLIENT_ID,
    "client_secret": process.env.COINBASE_CLIENT_SECRET,
    "redirect_uri": apiController.coinbase_API.redirect_URI
  }

  // POST request for token
  request('https://api.coinbase.com/oauth/token', {
    'method': 'POST',
    'body': JSON.stringify(opts),
    'headers': { 'content-type': 'application/JSON' }
  }, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);

      //store tokens in Database

      //pass tokens to cookies??

      //body.access_token
      //body.refresh_token
      //body.token_type: 'bearer',
      //body.expires_in: 7200,

      const client = new Client({'accessToken': body.access_token, 'refreshToken': body.refresh_token});
      client.getAccounts({}, function(err, accounts) {
        accounts.forEach(account => {
          console.log('bal: ' + account.balance.amount + ' currency: ' + account.balance.currency);
        });
      });


      // make API call for getUser once token is acquired
      request('https://api.coinbase.com/v2/user', {
        'headers': { 'Authorization': `Bearer ${body.access_token}`,
          'CB-VERSION': process.env.COINBASE_VERSION,
          'content-type': 'application/JSON'}
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {

              // body is user profile data with ID
              body = JSON.parse(body);
              // console.log('body is: ', body);

              //using coinbase API - getUser
              // client.getUser(body.data.id, (err, user) => {
              //   console.log('user is: ', user);
              // });

            }
            else console.log('error', response.statusCode, body);
          })


    }
    else console.log('error', body);
  })

})

app.listen(3000, () => 'listening on 3000');
