import * as TYPES from '../constants/actionTypes';

const intitialState = {
  authenticated: false,
  signup: false,
  error: {}
};

const user = (state = intitialState, action) => {
  switch (action.type) {
    case TYPES.SIGNUP_SUCCESS:
      return { ...state, signup: true, error: {} }
    case TYPES.SIGNUP_ERROR:
      return { ...state, signup: false, error: { signup: action.payload } }
    case TYPES.AUTH_USER:
      return { ...state, authenticated: true, error: {} }
    case TYPES.UNAUTH_USER:
      return { ...state, authenticated: false, error: {} }
    case TYPES.SIGNIN_ERROR:
      return { ...state, error: { signin: action.payload } }
    default:
      return state;
  }
}

export default user;