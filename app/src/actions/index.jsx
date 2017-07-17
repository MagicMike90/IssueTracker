import * as types from '../constants/ActionTypes'


const dataFetcher = (location) => {
  // construct query string request issue
  const query = Object.assign({}, queryString.parse(location.search));
  const pageStr = query._page;
  if (pageStr) {
    delete query._page;
    query._offset = (parseInt(pageStr, 10) - 1) * PAGE_SIZE;
  };

  const search = Object.keys(query).map(k => `${k}=${query[k]}`).join('&');
  return fetch(`/api/issues?${search}`).then(response => {
    if (!response.ok) return response.json().then(error => Promise.reject(error));
    return response.json().then(data => ({
      IssueList: data
    }));
  });
}

const receiveIssues = issues => ({
  type: types.RECEIVE_ISSUES,
  issues: issues
})

export const getAllIssues = () => dispatch => {
  fetch(`/api/issues`).then(response => {
    if (!response.ok) return response.json().then(error => Promise.reject(error));
    return response.json().then(data => ({
      IssueList: data
    }));
  });
}
