import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';
import IssueReport from './IssueReport.jsx';

const NoMatch = () => <p>Page Not Found</p>;

export default (
  <div>
    <Redirect from="/" to="/issues" />
    <Switch>
      <Route exact path="/issues" component={withRouter(IssueList)} />
      <Route exact path="/issues/:id" component={IssueEdit} />
      <Route exact path="reports" component={withRouter(IssueReport)} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);
