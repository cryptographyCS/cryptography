require('dotenv').config();
const db = require('../model');
const request = require('request');
const queryStrings = require('../../sql/queries');
const coinbase = require('coinbase');
/*eslint-disable*/
const exchangeController = {};

exchangeController.addExchange = (req, res, next) => {
  db.query(
    queryStrings.ADD_USER_EXCHANGE,
    [(req.body.exchange).toLowerCase(), res.locals.sessionUser, req.body.apiKey, req.body.apiSecret]
  ).then(result => {
    next();
  }).catch(err => console.error('Error adding exchange: ', err));
}

exchangeController.getUserExchanges = (req, res, next) => {
  console.log('res.locals is: ', res.locals)
  console.log('res.locals.sessionUser is: ', res.locals.sessionUser);
  db.query(
    queryStrings.GET_USER_EXCHANGES,
    [res.locals.sessionUser]
  ).then(result => {

    const totals = {};
    // would be better to use an API for lookup so that we had access to all coins
    const lookup = { 'ETH Wallet': 'Ethereum', 'LTC Wallet': 'Litecoin', 'BTC Wallet': 'Bitcoin', 'BCH Wallet':'Bitcoin Cash', 'USD Wallet':'Dollars' };
    
    // need to connect to an API for current price of coin
    const lookupPrice = { 'ETH Wallet': 0.1105, 'LTC Wallet': 0.0155, 'BTC Wallet': 1, 'BCH Wallet': 0.13462, 'USD Wallet': 8674.99 }
    const run = exchange => {
      if (exchange.name === 'coinbase') {
        var Client = require('coinbase').Client;
        var client = new Client({'apiKey': exchange.api_key, 'apiSecret': exchange.api_secret});
        
        client.getAccounts({}, function(err, accounts) {
          accounts.forEach(function(acct) {
            console.log(acct);
            if (totals[acct.name]) acct.amount += acct.balance.amount;
            else totals[acct.name] = {ticker: acct.name, amount: acct.balance.amount, name: lookup[acct.name], priceBTC: lookupPrice[acct.name]}
          });
          const returnArr = [];
          Object.keys(totals).forEach(wallet => {
            const obj = { ticker: totals[wallet].ticker, amount: totals[wallet].amount, name: totals[wallet].name, priceBTC: totals[wallet].priceBTC };
            returnArr.push(obj)
          })
          res.send(returnArr);
        })
      }
    }
    
    
    
    // console.log(result);
    //iterate thru array and make api calls accordingly    
    result.rows.forEach(exchange => {
      run(exchange);
    })
    
  }).catch(err => console.error('Cannot get user exchanges: ', err))
}

module.exports = exchangeController;
