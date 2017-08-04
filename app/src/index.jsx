import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { MuiThemeProvider } from 'material-ui/styles';

import Mui from './theme/Mui';
import App from './containers/App.jsx'
import reduxStore from './store/reduxStore';


render(
  <Provider store={reduxStore}>
    <Router>
       <MuiThemeProvider theme={Mui}> 
        <App />
       </MuiThemeProvider> 
    </Router>
  </Provider>,
  document.getElementById('contents')
)
if (module.hot) {
  module.hot.accept();
}
