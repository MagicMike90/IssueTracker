import * as types from '../actions/actionTypes';
import initialState from './initialState';


/* 
Things you should never do inside a reducer:
Mutate its arguments;
Perform side effects like API calls and routing transitions;
Call non-pure functions, e.g. Date.now() or Math.random().
*/

const issues = (state = initialState, action) => {
  switch (action.type) {
    case types.SEND_REQUEST:
      console.log('SEND_REQUEST', action);
      return Object.assign({}, state, {
        isFetching: true,
      });

    case types.REQUEST_SERVER_ERROR:
      console.log('REQUEST_SERVER_ERROR', action);
      return Object.assign({}, state, {
        error: action.error,
        receivedAt: action.receivedAt,
      });

    case types.LOAD_ISSUES_SUCCESS:
      console.log('LOAD_ISSUES_SUCCESS');
      return Object.assign({}, state, {
        issues: action.data.issues,
        totalCount: action.data.totalCount,
        isFetching: false,
        receivedAt: action.receivedAt
      });

    case types.CREATE_ISSUE_SUCCESS:
      console.log('CREATE_ISSUE_SUCCESS');
      const updatedIssue = action.issue;
      return Object.assign({}, state, {
        issues: state.issues.concat(updatedIssue),
        receivedAt: action.receivedAt
      });

    case types.DELETE_ISSUE_SUCCESS:
      console.log('DELETE_ISSUE_SUCCESS');

      const newIssues = state.issues.filter(issue => issue._id != action.issue._id);
      return Object.assign({}, state, {
        issues: newIssues,
        receivedAt: action.receivedAt
      });
    default:
      return state
  }
}

export default issues
