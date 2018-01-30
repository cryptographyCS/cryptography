//coinbase_API credentials
const coinbase_API = {
  client_id: 'c817fe601139eb3291145fba10eabe062efe518094d73eb58e8781f3c5dc26aa',
  client_secret: '285b05ae87bd15098c387f9fc2f4d158e5ad0a2506cb050ab1db725d9984ae47',
  redirect_URI: 'http://localhost:3000/newauth', //optional //hardcoded for now
  state: '134ef5504a94', //optional https://developers.coinbase.com/docs/wallet/coinbase-connect/security-best-practices#state-variable
  scope: 'wallet:accounts:read', //optional
}

//coinbase Oauth URL
let coinbase_API_authURL = `https://www.coinbase.com/oauth/authorize?response_type=code\
&client_id=${coinbase_API.client_id}\
&redirect_uri=${coinbase_API.redirect_URI}\
&state=${coinbase_API.state}\
&scope=${coinbase_API.scope}`

module.exports = { coinbase_API, coinbase_API_authURL };
