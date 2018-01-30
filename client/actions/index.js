import * as TYPES from '../constants/actionTypes';

const increaseUserCounter = () => {
  return {
    type: TYPES.INCREASE_USER_COUNTER
  }
}

const decreaseUserCounter = () => {
  return {
    type: TYPES.DECREASE_USER_COUNTER
  }
}

const increasePortfolioCounter = () => {
  return {
    type: TYPES.INCREASE_PORTFOLIO_COUNTER
  }
}

const decreasePortfolioCounter = () => {
  return {
    type: TYPES.DECREASE_PORTFOLIO_COUNTER
  }
}

module.exports = {
  increaseUserCounter,
  decreaseUserCounter,
  increasePortfolioCounter,
  decreasePortfolioCounter
}