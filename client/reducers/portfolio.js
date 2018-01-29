import * as TYPES from '../constants';

const intitialState = {
  portfolioCounter: 0
};

const portfolioReducer = (state = intitialState, action) => {
  switch (action.type) {
    case TYPES.INCREASE_PORTFOLIO_COUNTER:
      return {
        ...state,
        portfolioCounter: state.portfolioCounter + 1
      }
    case TYPES.DECREASE_PORTFOLIO_COUNTER:
      return {
        ...state,
        portfolioCounter: state.portfolioCounter - 1
      }
    default:
      return state;
  }
}

export default portfolioReducer;