import * as types from '../constants/ActionTypes'
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

export const requestIssuesSuccess = issues => ({
  type: types.REQUEST_ISSUES_SUCCESS,
  issues: issues,
  receivedAt: Date.now()
});


export const LoadIssues = (location, page_size) => dispatch => {
  let query = {};
  if (location !== undefined) {
    query = Object.assign({}, qs.parse(location.search));
    const pageStr = query._page;
    if (pageStr) {
      delete query._page;
      query._offset = (parseInt(pageStr, 10) - 1) * page_size;
    }
    query._limit = page_size;
  }

  const search = Object.keys(query).map(k => `${k}=${query[k]}`).join('&');
  return fetch(`/api/issues?${search}`).then(response => {
    if (!response.ok) return response.json().then(error => Promise.reject(error));
    return response.json().then(data => dispatch(requestIssuesSuccess)).catch(error => dispatch(requestIssuesError(error)));
  });
};
