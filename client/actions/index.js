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
 * Sign up user
 */
const signUpUser = (props) => {
  const { username, password } = props;
  return function (dispatch) {
    fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-type': 'response/json' },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(dispatch({ type: TYPES.SIGNUP_SUCCESS }))
      .catch(err => dispatch(authError(TYPES.SIGNUP_ERROR, 'Invalid username or password')));
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
 * Sign out user
 */
const singOutUser = () => {
  return {
    type: TYPES.UNAUTH_USER
  }
}






/**
 * Test functions - to be deleted
 */
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
  authError,
  signUpUser,
  signInUser,
  singOutUser,
  increasePortfolioCounter,
  decreasePortfolioCounter
}