// const key          = '...'; // API Key
// const secret       = '...'; // API Private Key
const bodyParser = require('body-parser');
const KrakenClient = require('kraken-api');


const kraken = new KrakenClient(key, secret);


(async () => {
	// Display user's balance
	console.log(await kraken.api('Balance'));

	// Get Ticker Info
	console.log(await kraken.api('Ticker', { pair : 'XXBTZUSD' }));
})();


// get user creds middleware
const getUserCreds = (req, res, next) => {
  const kraken = new KrakenClient(req.body.key, req.body.secret);
  next();
}
