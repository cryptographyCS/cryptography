require('dotenv').config();
const db = require('../model');
const queryStrings = require('../../sql/queries');

const exchangeController = {};

exchangeController.addExchange = (req, res, next) => {
  db.query(
    queryStrings.ADD_EXCHANGE,
    [req.body.exchange, req.body.apiKey, date, req.body.apiSecret]
  ).then(result => {
    next();
  }).catch(err => console.error('Error adding exchange: ', err));
}

exchangeController.getUserExchanges = (req, res, next) => {
  db.query(
    queryStrings.GET_USER_EXCHANGES,
    [res.locals.sessionUsers]
  ).then(result => {
    console.log(result);
    //iterate thru array and make api calls accordingly
  }).catch(err => console.error('Cannot get user exchanges: ', err))
}

module.exports = exchangeController;
