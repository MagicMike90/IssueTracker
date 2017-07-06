import React from 'react';
import ReactDOM from 'react-dom'
import { Router, Route, Switch, Redirect, withRouter } from 'react-router';
// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

import IssueList from './IssueList.jsx'
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>;

// withRouter IssueList can use this.props.router to access the router object.

const App = (props) => (
    <div>
        <div className="header">
            <h1>Issue Tracker</h1>
        </div>
        <div className="contents">
            {props.children}
        </div>
        <div className="footer">
            Full source code available at this <a href="https://github.com/vasansr/pro-mern-stack">GitHub repository</a>.
        </div>

        <Route path="/issues" component={withRouter(IssueList)} />
        <Route path="/issue/:id" component={IssueEdit} />
        <Route component={NoMatch} />
    </div>
);
App.propTypes = {
    children: React.PropTypes.object.isRequired,
};

const RoutedApp = () => (
    <Router history={history}>
        <div>
            <Redirect from="/" to="/issues" />
            <Route path="/" component={App} >
  
            </Route>
        </div>
    </Router>
);
ReactDOM.render(<RoutedApp />, contentNode);



if (module.hot) {
    module.hot.accept();
}
