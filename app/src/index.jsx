import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import App from './containers/App.jsx'
import reducer from './reducers'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));

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
