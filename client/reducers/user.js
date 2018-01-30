import * as TYPES from '../constants/actionTypes';

const intitialState = {
  userCounter: 0
};

const user = (state = intitialState, action) => {
  switch (action.type) {
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