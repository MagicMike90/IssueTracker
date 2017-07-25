import { combineReducers } from 'redux'
import issuesReducer from './issues'

const issueTrackerApp = combineReducers({
  issuesReducer
})

export default issueTrackerApp
