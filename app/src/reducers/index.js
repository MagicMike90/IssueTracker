import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import issuesState from './issues';
import notification from './notifications';

const issueTrackerApp = combineReducers({
  issuesState,
  notification,
  form: formReducer
});

export default issueTrackerApp;
