import * as types from '../actions/actionTypes';


/* 
Things you should never do inside a reducer:
Mutate its arguments;
Perform side effects like API calls and routing transitions;
Call non-pure functions, e.g. Date.now() or Math.random().
*/

const notification = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_NOTIFICATION:
      return Object.assign({}, state, {
        message: action.message,
        level: action.level
      });

    default:
      console.debug('notification reducer :: hit default', action.type);
      return state;
  }
}

export default notification;
