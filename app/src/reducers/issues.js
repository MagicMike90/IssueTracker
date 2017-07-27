import * as types from '../actions/actionTypes';
import initialState from './initialState';

const issues = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_SERVER_ERROR:
      console.log('REQUEST_SERVER_ERROR');
      return Object.assign({}, state, {
        error: action.error,
        receivedAt: action.receivedAt,
      });

    case types.LOAD_ISSUES_SUCCESS:
      console.log('LOAD_ISSUES_SUCCESS');
      const issues = action.data.records;
      issues.forEach(issue => {
        issue.created = new Date(issue.created);
        if (issue.completionDate) {
          issue.completionDate = new Date(issue.completionDate);
        }
      });

      return Object.assign({}, state, {
        issues: issues,
        totalCount: action.data.metadata.totalCount,
        isFetching: false,
        receivedAt: action.receivedAt
      });

    case types.CREATE_ISSUE_SUCCESS:
      console.log('CREATE_ISSUE_SUCCESS');
      const updatedIssue = action.issue;
      action.history.push({ pathname: `/issues/${updatedIssue._id}` })
      return Object.assign({}, state, {
        updatedIssue: updatedIssue,
        receivedAt: action.receivedAt
      });
    default:
      return state
  }
}

export default issues
