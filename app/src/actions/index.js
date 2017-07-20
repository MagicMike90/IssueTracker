import * as types from '../constants/ActionTypes'
import qs from 'qs'

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const addIssue = issue => ({
  type: types.ADD_ISSUE,
  issue: issue
})
const receiveIssues = issues => ({
  type: types.RECEIVE_ISSUES,
  issues: issues
})

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
    return response.json().then(data => dispatch(receiveIssues));
  });
}

export const requestPosts = reddit => ({
  type: REQUEST_POSTS,
  reddit
})

export const receivePosts = (reddit, json) => ({
  type: RECEIVE_POSTS,
  reddit,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

const fetchPosts = reddit => dispatch => {
  dispatch(requestPosts(reddit))
  return fetch(`https://www.reddit.com/r/${reddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(reddit, json)))
}


const shouldFetchIssues = (state, issue) => {
  const issues = state.postsByReddit[reddit]
  if (!issues) {
    return true
  }
  if (issues.isFetching) {
    return false
  }
  return issues.didInvalidate
}
export const fetchIssuesIfNeeded = reddit => (dispatch, getState) => {
  if (shouldFetchIssues(getState(), reddit)) {
    return dispatch(fetchPosts(reddit))
  }
}
