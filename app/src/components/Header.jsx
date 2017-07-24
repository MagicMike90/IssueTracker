import React from 'react';
import PropTypes from 'prop-types';

import { Navbar, Nav, NavItem, Col, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router-dom';

import IssueAddNavItem from './IssueAddNavItem.jsx';
// import IssueAddNavItem from '../containers/IssueAddContainer.jsx';

import withToast from './withToast.jsx';

const Header = (props) => (
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
      <IssueAddNavItem showError={props.showError}/>
      < NavDropdown id="user-dropdown" title={<Glyphicon glyph="option-horizontal" />} noCaret>
        <MenuItem>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>
);

Header.prototypes = {
  showError: PropTypes.func.isRequired,
  showSuccess: PropTypes.func.isRequired,
}

export default withRouter(withToast(Header));
