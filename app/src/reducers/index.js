import { combineReducers } from 'redux'
import issues from './issues'

const issueTrackerApp = combineReducers({
  issues
})

export default issueTrackerApp
