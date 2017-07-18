import * as types from '../constants/ActionTypes'

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const addIssue = issue => ({
  type: types.ADD_ISSUE,
  issue:issue
})
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
