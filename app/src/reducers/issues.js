import * as types from '../actions/actionTypes';
import initialState from './initialState';


const convertedIssue = issue => {
  issue.created = new Date(issue.created);
  if (issue.completionDate) {
    issue.completionDate = new Date(issue.completionDate);
  }
  return issue;
}

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
      const issues = action.data.issues;
      issues.forEach(issue => convertedIssue(issue));

      return Object.assign({}, state, {
        issues: issues,
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
        issues: state.issues.concat(convertedIssue(updatedIssue)),
        receivedAt: action.receivedAt
      });

    case types.DELETE_ISSUE_SUCCESS:
      console.log('DELETE_ISSUE_SUCCESS');
      // const newIssues = state.issues.filter(issue => issue._id != action.issue._id);
      return Object.assign({}, state, {
        issues: state.issues.filter(issue => issue._id != action.issue._id),
        receivedAt: action.receivedAt
      });
    default:
      return state
  }
}

export default issues
