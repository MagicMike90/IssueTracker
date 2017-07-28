import * as types from '../actions/actionTypes';
import initialState from './initialState';

const issues = (state = initialState, action) => {
  switch (action.type) {
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
      action.history.push({
        pathname: `/issues/${updatedIssue._id}`
      })
      return Object.assign({}, state, {
        updatedIssue: updatedIssue,
        receivedAt: action.receivedAt
      });

    case types.DELETE_ISSUE_SUCCESS:
      console.log('DELETE_ISSUE_SUCCESS');

      const newIssues = state.issues.filter(issue => issue._id != action.issue._id);

      console.log('newIssues',newIssues);
      return Object.assign({}, state, {
        issues: newIssues,
        receivedAt: action.receivedAt
      });
    default:
      return state
  }
}

export default issues
