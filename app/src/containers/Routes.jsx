import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import App from './App.jsx';
// import IssueList from './IssueList.jsx';
import Issuelist from '../components/Issuelist.jsx';
// import IssuesContainer from '../containers/IssuesContainer.jsx';
import IssueEdit from '../components/IssueEdit.jsx';
import IssueReport from '../components/IssueReport.jsx';

const NoMatch = () => <p>Page Not Found</p>;

const Routes = () => (
  <div>
    <Switch>
      <Redirect exact from="/" to="/issues" />
      <Route exact path="/issues" component={withRouter(Issuelist)} />
      <Route exact path="/issues/:id" component={IssueEdit} />
      <Route exact path="/reports" component={withRouter(IssueReport)} />
      <Route component={NoMatch} />
    </Switch>
  </div>
)
export default Routes;
