const issues = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ISSUE':
    console.log('state',state);
      return [
       Object.assign({} ,state, action.issue)
      ]
    case 'RECEIVE_ISSUES':
      return action.issues;
    default:
      return state
  }
}

export default issues
