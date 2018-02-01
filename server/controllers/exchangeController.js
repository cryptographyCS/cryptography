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

exchangeController.getExchangeInfo = (req, res, next) => {
  db.query(
    queryStrings.GET_ALL_EXCHANGES,
    [res.locals.sessionUsers]
  ).then(result => {
    //iterate thru array and make api calls accordingly
  })
}
