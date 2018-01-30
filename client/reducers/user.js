import * as TYPES from '../constants/actionTypes';

const intitialState = {
  userCounter: 0,
  authenticated: false,
  error: {}
};

const user = (state = intitialState, action) => {
  switch (action.type) {
    case TYPES.AUTH_USER:
      return { ...state, authenticated: true, error: {} }
    case TYPES.SIGNIN_ERROR:
      return { ...state, error: { signin: action.payload } }
    case TYPES.INCREASE_USER_COUNTER:
      return {
        ...state,
        userCounter: state.userCounter + 1
      }
    case TYPES.DECREASE_USER_COUNTER:
      return {
        ...state,
        userCounter: state.userCounter - 1
      }
    default:
      return state;
  }
}

export default user;