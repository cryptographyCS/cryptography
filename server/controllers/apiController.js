const url = require('url');
const request = require('request');
const path = require('path');
const bodyParser = require('body-parser');
const Client = require('coinbase').Client;

// coinbase_API credentials
const coinbase_creds = {
  redirect_URI: 'http://localhost:3000/coinbase/redirect', //optional //hardcoded for now
  state: '134ef5504a94', //optional https://developers.coinbase.com/docs/wallet/coinbase-connect/security-best-practices#state-variable
  scope: 'wallet:accounts:read', //optional
}

// coinbase Oauth URL
let coinbase_authURL = `https://www.coinbase.com/oauth/authorize?response_type=code\
&client_id=${process.env.COINBASE_CLIENT_ID}\
&redirect_uri=${coinbase_creds.redirect_URI}\
&state=${coinbase_creds.state}\
&scope=${coinbase_creds.scope}\
&account=all`

// middleware to get token for coinbase
const coinbase_getToken = (req, res, next) => {

  // redirect URI query string
  const queryData = url.parse(req.url, true).query;

  // credentials needed for token
  const opts = {
    "grant_type": "authorization_code",
    "code": `${queryData.code}`,
    "client_id": process.env.COINBASE_CLIENT_ID,
    "client_secret": process.env.COINBASE_CLIENT_SECRET,
    "redirect_uri": coinbase_creds.redirect_URI
  }

  // POST request to get a token
  request('https://api.coinbase.com/oauth/token', {
    'method': 'POST',
    'body': JSON.stringify(opts),
    'headers': { 'content-type': 'application/JSON' }
  }, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);

      //store tokens in Database

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
      // request('https://api.coinbase.com/v2/user', {
      //   'headers': { 'Authorization': `Bearer ${body.access_token}`,
      //     'CB-VERSION': process.env.COINBASE_VERSION,
      //     'content-type': 'application/JSON'}
      //   }, (error, response, body) => {
      //       if (!error && response.statusCode == 200) {
      //
      //         // body is user profile data with ID
      //         body = JSON.parse(body);
      //         // console.log('body is: ', body);
      //
      //         //using coinbase API - getUser
      //         // client.getUser(body.data.id, (err, user) => {
      //         //   console.log('user is: ', user);
      //         // });
      //
      //       }
      //       else console.log('error', response.statusCode, body);
      //     })


    }
    else console.log('error', body);
  })
  next();
  // reroute with router
  // res.redirect(path.resolve(__dirname, '../', '../', 'build', 'index.html'));
}

const coinbase_read = (req, res) => {
  //body.access_token and body.refresh_token should come from the database
  const client = new Client({'accessToken': body.access_token, 'refreshToken': body.refresh_token});
  client.getAccounts({}, function(err, accounts) {
    accounts.forEach(account => {
      console.log('bal: ' + account.balance.amount + ' currency: ' + account.balance.currency);
    });
  });
}


module.exports = { coinbase_creds, coinbase_authURL, coinbase_getToken };
