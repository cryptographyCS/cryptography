// const url = require('url');
// const path = require('path');
const bodyParser = require('body-parser');
const binance = require('node-binance-api');


// have user provide the key and secret
binance.options({
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_API_SECRET,
  useServerTime: true,
  test: true
})

// set user credentials to make API calls
const setBinanceOptions = (req, res, next) => {
  binance.options.APIKEY = req.body.APIKEY
  binance.options.APISECRET = req.body.APISECRET
  next();
}


// list of current prices
binance.prices((error, ticker) => {
	console.log("prices()", ticker);
	console.log("Price of BNB: ", ticker.BNBBTC);
});

// list of user's current balances
binance.balance((error, balances) => {
	console.log("balances()", balances);
	// console.log("ETH balance: ", balances.ETH.available);
  return balances;
});

module.exports = { binance, setBinanceOptions };
