import React from 'react';
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import IssueList from './IssueList.jsx'
import IssueEdit from './IssueEdit.jsx';
import IssueReport from './IssueReport.jsx';

import IssueAddNavItem from './IssueAddNavItem.jsx';

import withToast from './withToast.jsx';


const Header = () => (
    <Navbar fluid>
        <Navbar.Header>
            <Navbar.Brand>Issue Tracker</Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <LinkContainer to="/issues">
                <NavItem>Issues</NavItem>
            </LinkContainer>
            <LinkContainer to="/reports">
                <NavItem>Reports</NavItem>
            </LinkContainer>
        </Nav>
        <Nav pullRight>
            <IssueAddNavItem />
            < NavDropdown id="user-dropdown" title={<Glyphicon glyph="option-horizontal" />} noCaret>
                <MenuItem>Logout</MenuItem>
            </NavDropdown>
        </Nav>
    </Navbar>
);
// withRouter IssueList can use this.props.router to access the router object.(this.props.location)
const App = (props) => (
    <div>
        <Header />
        <div className="container-fluid">
            {props.children}
            <hr />
            <h5><small>
                Full source code available at this <a href="https://github.com/vasansr/pro-mern-stack">GitHub repository</a>.
            </small></h5>
        </div>
    </div>
);
App.propTypes = {
    children: React.PropTypes.object.isRequired,
};


const NoMatch = () => <p>Page Not Found</p>;
// exact let routes match exaclty /issues not /issues/:id
const RoutedApp = () => (
    <Router>
        <div>
            <App>
                <Switch>
                    <Redirect exact from="/" to="/issues" />
                    <Route exact path="/issues" component={withRouter(IssueList)} />
                    <Route exact path="/issues/:id" component={IssueEdit} />
                    <Route exact path="/reports" component={withRouter(IssueReport)} />
                    <Route component={NoMatch} />
                </Switch>
            </App>
        </div>
    </Router>
);
const contentNode = document.getElementById('contents');
ReactDOM.render(<RoutedApp />, contentNode);



if (module.hot) {
    module.hot.accept();
}
