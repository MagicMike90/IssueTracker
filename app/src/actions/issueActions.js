import * as types from './actionTypes'
import issueApi from '../api/IssuesApi';
import qs from 'qs'



export const requestIssuesLoading = loading => ({
  type: types.REQUEST_ISSUES_LOADING,
  isLoading: loading
});

export const requestIssuesError = error => ({
  type: types.REQUEST_ISSUES_ERROR,
  error: error,
  receivedAt: Date.now()
});


export const requestIssuesSuccess = data => {
  const issues = data.records;
  issues.forEach(issue => {
    issue.created = new Date(issue.created);
    if (issue.completionDate) {
      issue.completionDate = new Date(issue.completionDate);
    }
  });

  return {
    type: types.REQUEST_ISSUES_SUCCESS,
    issues,
    totalCount: data.metadata.totalCount,
    receivedAt: Date.now()
  }
};


export const fetchIssues = (location, page_size) => dispatch => {
  const query = Object.assign({}, qs.parse(location.search));
  const pageStr = query._page;
  if (pageStr) {
    delete query._page;
    query._offset = (parseInt(pageStr, 10) - 1) * page_size;
  }
  query._limit = page_size;

  const search = Object.keys(query).map(k => `${k}=${query[k]}`).join('&');
  return issueApi.getAllIssues(search).then(issues => {
    console.log('issues',issues);
    dispatch(requestIssuesSuccess(issues));
  }).catch(error => dispatch(requestIssuesError(error)));

};

const shouldFetchIssues = (state) => {
  const issuesReducer = state.issuesReducer;
  if (issuesReducer.issues.length == 0) {
    return true
  }
  if (issuesReducer.isFetching) {
    return false
  }
  return issuesReducer.failed;
}
export const fetchIssuesIfNeeded = (location, page_size) => (dispatch, getState) => {
  if (shouldFetchIssues(getState())) {
    return dispatch(fetchIssues(location, page_size));
  }
}
