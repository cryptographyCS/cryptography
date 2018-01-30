// coinbase_API credentials
const coinbase_API = {
  redirect_URI: 'http://localhost:3000/coinbase/redirect', //optional //hardcoded for now
  state: '134ef5504a94', //optional https://developers.coinbase.com/docs/wallet/coinbase-connect/security-best-practices#state-variable
  scope: 'wallet:accounts:read', //optional
}

// coinbase Oauth URL
let coinbase_API_authURL = `https://www.coinbase.com/oauth/authorize?response_type=code\
&client_id=${process.env.COINBASE_CLIENT_ID}\
&redirect_uri=${coinbase_API.redirect_URI}\
&state=${coinbase_API.state}\
&scope=${coinbase_API.scope}\
&account=all`


module.exports = { coinbase_API, coinbase_API_authURL };
