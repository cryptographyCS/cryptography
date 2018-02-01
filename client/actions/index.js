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
const signUpUser = (state) => {
  const { username, password, email } = state;
  return function (dispatch) {
    return fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password, email })
    })
      .then(response => response.json())
      .then(response => response.username ? dispatch({ type: TYPES.SIGNUP_SUCCESS }) : null)
      .catch(err => dispatch(authError(TYPES.SIGNUP_ERROR, 'Registration server error')));
  }
}

/**
 * Sign in user
 */
const signInUser = (props) => {
  const { username, password } = props;
  return function (dispatch) {
    return fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(response => response.username ? dispatch({ type: TYPES.AUTH_USER }) : null)
      .catch(err => dispatch(authError(TYPES.SIGNIN_ERROR, 'Authentication server error')));
  }
}

/**
 * Sign out user
 */
const signOutUser = () => {
  return function (dispatch) {
    fetch('/api/logout', {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    })
      .then(dispatch({ type: TYPES.UNAUTH_USER }))
  }
}

/**
 * Add an exchange in Settings
 */
const addExchange = (props) => {
  const { exchange, apiKey, apiSecret } = props;
  return function (dispatch) {
    fetch('/api/addExchange', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ exchange, apiKey, apiSecret }),
    })
      .catch(err => console.log('Error adding exchange', err));
  };
};

/**
 * Get/Refresh coin amounts in Portfolio. NOT currently using this action, but doing it in React instead.
 */
const getCoins = (props) => {
  return function (dispatch) {
    fetch('/api/update', {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    })
      .then(response => response.json())
      .then(response => {
        return { type: TYPE.UPDATE_COINS, payload: response }
      })
      .catch(err => console.log('Error fetching coins'));
  }
};

module.exports = {
  authError,
  signUpUser,
  signInUser,
  signOutUser,
  addExchange,
  getCoins,
}
