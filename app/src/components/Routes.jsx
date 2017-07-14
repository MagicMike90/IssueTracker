import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import App from './App.jsx';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';
import IssueReport from './IssueReport.jsx';

const NoMatch = () => <p>Page Not Found</p>;

const Routes = () => (
  <App>
    <Switch>
      <Redirect exact from="/" to="/issues" />
      <Route exact path="/issues" component={withRouter(IssueList)} />
      <Route exact path="/issues/:id" component={IssueEdit} />
      <Route exact path="/reports" component={withRouter(IssueReport)} />
      <Route component={NoMatch} />
    </Switch>
  </App>
)
export default Routes;
