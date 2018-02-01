import * as TYPES from '../constants/actionTypes';

const intitialState = {
  coins: [
    {
      name: 'Ethereum',
      amount: 6.5,
      priceBTC: 0.10586500,
      ticker: 'ETC',
    },
    {
      name: 'Bitcoin',
      amount: 3.2,
      priceBTC: 1,
      ticker: 'BTC',
    },
    {
      name: 'Litecoin',
      amount: 12.4,
      priceBTC: 0.01626100,
      ticker: 'LTC',
    },
    {
      name: 'Ripple',
      amount: 4795,
      priceBTC: 0.00011842,
      ticker: 'XRP',
    },
    {
      name: 'Walton',
      amount: 50000,
      priceBTC: 0.00343169,
      ticker: 'WTC',
    },
  ],
};

const portfolio = (state = intitialState, action) => {
  switch (action.type) {
    case TYPES.UPDATE_COINS:
      return { coins: action.payload };
    default:
      return state;
  }
};

export default portfolio;
