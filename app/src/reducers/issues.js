const issues = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ISSUE':
    console.log('state',state);
      return [
       Object.assign({} ,state, action.issue)
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id) 
          ? Object.assign({},todo, {completed: !todo.completed})
          : todo
      )
    default:
      return state
  }
}

export default issues
