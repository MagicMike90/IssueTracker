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
