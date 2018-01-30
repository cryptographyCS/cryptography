import * as TYPES from '../constants/actionTypes';

/**
 * Error helper function
 */
const authError = (TYPE, error) => {
  return {
    type: TYPE,
    payload: error
  }
}


/**
 * Sign in user
 */
const signInUser = (props) => {
  const { username, password } = props;
  return function (dispatch) {
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-type': 'response/json' },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(dispatch({ type: TYPES.AUTH_USER }))
      .catch(err => dispatch(authError(TYPES.SIGNIN_ERROR, 'Invalid username or password')));
  }
}



/**
 * Test functions - to be deleted
 */
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