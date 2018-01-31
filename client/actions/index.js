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
  const { registerUser, registerPassword2 } = state;
  const username = registerUser;
  const password = registerPassword2;
  console.log(`username: ${username}`);
  console.log(`password: ${password}`);
  return function (dispatch) {
    fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(response => response.username ? dispatch({ type: TYPES.SIGNUP_SUCCESS }) : null)
      .catch(err => dispatch(authError(TYPES.SIGNUP_ERROR, 'Signing up with an invalid username or password')));
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
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(response => response.username ? dispatch({ type: TYPES.AUTH_USER }) : null)
      .catch(err => dispatch(authError(TYPES.SIGNIN_ERROR, 'Signing in with an invalid username or password')));
  }
}

/**
 * Sign out user
 */
const signOutUser = () => {
  return {
    type: TYPES.UNAUTH_USER
  }
}

module.exports = {
  authError,
  signUpUser,
  signInUser,
  signOutUser
}
