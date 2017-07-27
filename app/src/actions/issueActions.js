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

export const fetchIssues = (location, page_size) => dispatch => {
  const query = Object.assign({}, qs.parse(location.search));
  const pageStr = query._page;
  if (pageStr) {
    delete query._page;
    query._offset = (parseInt(pageStr, 10) - 1) * page_size;
  }
  query._limit = page_size;

  const search = Object.keys(query).map(k => `${k}=${query[k]}`).join('&');

  console.log('search',search);
  return issueApi.getAllIssues(search).then(issues => {
      console.log('fetchIssues',issues);
    dispatch(requestIssuesSuccess(issues));
  }).catch(error => {
      console.log('fetchIssues error',error);
    dispatch(requestIssuesError(error))
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
    console.log('fetchIssuesIfNeeded',location,page_size);
    return dispatch(fetchIssues(location, page_size));
  }
}

export const createIssue = (issue, history) => {
  // make async call to api, handle promise, dispatch action when promise is resolved
  // return dispatch => {
  //   issueApi.createIssue(issue).then(updatedIssue => {
  //     dispatch(createIssueSuccess(updatedIssue, history));
  //   }).catch(error => {
  //     console.log('createIssue',error);
  //     dispatch(requestIssuesError(error))
  //   });
  // }
  return dispatch => {
    issueApi.createIssue(issue).then(updatedIssue => {
      dispatch(createIssueSuccess(updatedIssue, history));
    }).catch(error => {
      dispatch(requestIssuesError(error))
    });
  }
}