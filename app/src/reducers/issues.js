import * as types from '../actions/actionTypes';
import initialState from './initialState';

const issues = (state = initialState, action) => {

  switch (action.type) {
    case types.REQUEST_ISSUES_ERROR:
      console.log('REQUEST_ISSUES_ERROR');
      return Object.assign({}, state, {
        error: action.error,
        receivedAt: action.receivedAt,
        failed: true
      });
    case types.REQUEST_ISSUES_LOADING:
      console.log('REQUEST_ISSUES_LOADING');
      return Object.assign({}, state, {
        isFetching: true,
        failed: false
      });
    case types.REQUEST_ISSUES_SUCCESS:
      console.log('REQUEST_ISSUES_SUCCESS');
      return Object.assign({}, state, {
        issues: action.issues,
        totalCount: action.totalCount,
        isFetching: true,
        failed: false,
        receivedAt: action.receivedAt
      });
    default:
      return state
  }
}

export default issues
