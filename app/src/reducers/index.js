import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import issuesReducer from './issues'

const issueTrackerApp = combineReducers({
  issuesReducer,
  form: formReducer
});

export default issueTrackerApp;
