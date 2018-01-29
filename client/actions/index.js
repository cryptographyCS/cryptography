import * as TYPES from '../constants';

const increaseUserCounter = () => {
  return {
    type: INCREASE_USER_COUNTER
  }
}

const decreaseUserCounter = () => {
  return {
    type: DECREASE_USER_COUNTER
  }
}

const increaseExchangeCounter = () => {
  return {
    type: INCREASE_PORTFOLIO_COUNTER
  }
}

const decreaseExchangeCounter = () => {
  return {
    type: DECREASE_PORTFOLIO_COUNTER
  }
}

module.exports = {
  increaseUserCounter,
  decreaseUserCounter,
  increaseExchangeCounter,
  decreaseExchangeCounter
}