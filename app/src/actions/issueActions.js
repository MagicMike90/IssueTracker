import * as types from './actionTypes'
import issueApi from '../api/IssuesApi';
import qs from 'qs'



export const requestIssuesError = error => ({
  type: types.REQUEST_SERVER_ERROR,
  error: error,
  receivedAt: Date.now()
});

export const requestIssuesSuccess = data => ({
  type: types.LOAD_ISSUES_SUCCESS,
  data,
  receivedAt: Date.now()
});
export const createIssueSuccess = (issue, history) => ({
  type: types.CREATE_ISSUE_SUCCESS,
  issue,
  history
});
export const deleteIssueSuccess = (issue, history) => ({
  type: types.DELETE_ISSUE_SUCCESS,
  issue,
  history
});


const convertedIssue = issue => {
  issue.created = new Date(issue.created);
  if (issue.completionDate) {
    issue.completionDate = new Date(issue.completionDate);
  }
  return issue;
}
export const fetchIssues = (location, page_size) => dispatch => {
  const query = Object.assign({}, qs.parse(location.search));
  const pageStr = query._page;
  if (pageStr) {
    delete query._page;
    query._offset = (parseInt(pageStr, 10) - 1) * page_size;
  }
  query._limit = page_size;

  const search = Object.keys(query).map(k => `${k}=${query[k]}`).join('&');


  return issueApi.getAllIssues(search).then(response => {
    if (!response.ok) return response.json().then(error => Promise.reject(error));
    response.json().then(data => {
      const issues = data.records;
      issues.forEach(issue => convertedIssue(issue));
      dispatch(requestIssuesSuccess({
        issues,
        totalCount: data.metadata.totalCount
      }));
    });
  }).catch(err => {
    const errorMsg = `Error in fetching data from server: ${err}`;
    dispatch(requestIssuesError(errorMsg))
  });
};

const shouldFetchIssues = (state) => {
  const issuesReducer = state.issuesReducer;
  if (issuesReducer.issues.length == 0) {
    return true
  }
  if (issuesReducer.isFetching) {
    return false;
  }
  return issuesReducer.failed;
}
export const fetchIssuesIfNeeded = (location, page_size) => (dispatch, getState) => {

  if (shouldFetchIssues(getState())) {
    return dispatch(fetchIssues(location, page_size));
  }
}

export const createIssue = (issue, history) => {
  return dispatch => {
    issueApi.createIssue(issue).then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          const errorMsg = `Failed to add issue: ${error.message}`;
          dispatch(requestIssuesError(errorMsg))
        });
      }
      response.json().then(updatedIssue => {
        updatedIssue = convertedIssue(updatedIssue);
        dispatch(createIssueSuccess(updatedIssue, history));
      })
    }).catch(error => {
      const errorMsg = `Error in sending data to server: ${error.message}`;
      dispatch(requestIssuesError(errorMsg))
    });
  }
}
export const deleteIssue = (issue, history) => {
  return dispatch => {
    issueApi.deleteIssue(issue).then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          const errorMsg = `Failed to delete issue`;
          dispatch(requestIssuesError(errorMsg))
        });
      }
      return dispatch(deleteIssueSuccess(issue, history));
    }).catch(error => {
      const errorMsg = `Error in sending data to server: ${error.message}`;
      dispatch(requestIssuesError(errorMsg))
    });
  }
}
