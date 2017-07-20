import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import App from './containers/App.jsx'
import reducer from './reducers'
import { LoadIssues } from './actions';

const middleware = [ thunk ];
const store = createStore(reducer, applyMiddleware(thunk));

store.dispatch(LoadIssues());

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('contents')
)
if (module.hot) {
  module.hot.accept();
}
