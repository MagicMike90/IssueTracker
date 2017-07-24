import * as types from '../actions/actionTypes';
import initialState from './initialState';

const issues = (state = initialState , action) => {

  switch (action.type) {
    case types.REQUEST_ISSUES_ERROR:
      return Object.assign({}, state, {
        failed: true
      });
    case types.REQUEST_ISSUES_LOADING:
      return Object.assign({}, state, {
        isFetching: true,
        failed: false
      });
    case types.REQUEST_ISSUES_SUCCESS:
      console.log('action.issue', action.issue)
      return action.issue;
    default:
      console.log('default', state)
      return state
  }
}

export default issues
