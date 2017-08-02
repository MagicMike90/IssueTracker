import * as types from '../actions/actionTypes';



const notification = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_NOTIFICATION:
      return Object.assign({}, state, {
        message: action.message,
        level: action.level
      });
    default:
      return state;
  }
}

export default notification;
