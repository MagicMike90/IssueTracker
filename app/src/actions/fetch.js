import * as types from './actionTypes'
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

// export const requestIssuesSuccess = issues => ({
//   type: types.REQUEST_ISSUES_SUCCESS,
//   issues: issues,
//   receivedAt: Date.now()
// });

export const requestIssuesSuccess = data => {
  console.log('data', data);
  const issues = data.records;
  issues.forEach(issue => {
    issue.created = new Date(issue.created);
    if (issue.completionDate) {
      issue.completionDate = new Date(issue.completionDate);
    }
  });
  const post_data = {
    issues,
    totalCount: data.metadata.totalCount
  };

  return {
    type: types.REQUEST_ISSUES_SUCCESS,
    post_data
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
  console.log('search', search);
  return fetch(`/api/issues?${search}`).then(response => {
    if (!response.ok) return response.json().then(error => Promise.reject(error));
    return response.json().then(data => {
      const issues = data.records;
      issues.forEach(issue => {
        issue.created = new Date(issue.created);
        if (issue.completionDate) {
          issue.completionDate = new Date(issue.completionDate);
        }
      });
      var post_data = {
        issues,
        totalCount: data.metadata.totalCount
      };
      dispatch(requestIssuesSuccess(post_data))
    }).catch(error => dispatch(requestIssuesError(error)));
  });
};
const shouldFetchIssues = (state, location) => {
  const oldQuery = qs.parse(prevProps.location.search);
  const newQuery = qs.parse(location.search);

  if (newQuery === undefined) return false;

  // When loading data, we asynchronously updated the state,
  // and React has no way of knowing that it was done as part
  // of the lifecycle method. Even if we had used the method
  // ComponentWillReceiveProps, we would have had to compare
  // the old and new.
  if (oldQuery.status === newQuery.status &&
    oldQuery.effort_gte === newQuery.effort_gte &&
    oldQuery.effort_lte === newQuery.effort_lte &&
    oldQuery._page === newQuery._page) {
    return false;
  }

  return true;
}
export const fetchIssuesIfNeeded = (location, page_size) => (dispatch, getState) => {
  console.log('fetchIssuesIfNeeded');
  // if (shouldFetchIssues(getState(), location)) {
  return dispatch(fetchIssues(location, page_size));
  // }
}
