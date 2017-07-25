import * as types from '../actions/actionTypes';
import initialState from './initialState';

const issues = (state = initialState , action) => {

  switch (action.type) {
    case types.REQUEST_ISSUES_ERROR:
    console.log('REQUEST_ISSUES_ERROR',action);
      return Object.assign({}, state, {
        error: action.error,
        receivedAt: action.error,
        failed: true
      });
    case types.REQUEST_ISSUES_LOADING:
        console.log('REQUEST_ISSUES_LOADING',action);
      return Object.assign({}, state, {
        isFetching: true,
        failed: false
      });
    case types.REQUEST_ISSUES_SUCCESS:
     console.log('REQUEST_ISSUES_SUCCESS',action);
      return action;
    default:
      return state
  }
}

export default issues
