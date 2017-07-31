import React from 'react';
import PropTypes from 'prop-types';

import { Navbar, Nav, NavItem, Col, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter, Link } from 'react-router-dom';


import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';


import IssueAddNavItem from './IssueAddNavItem.jsx';
import withToast from './withToast.jsx';

const styleSheet = createStyleSheet({
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
});

function Header(props) {
  const classes = props.classes;
  const myComponent = <Link to="/reports" />;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit" className={classes.flex}>
            Issue Tracker
          </Typography>
          <Button color="contrast" onClick={() => props.history.push('/issues')}>Issues</Button>
          <Button color="contrast" onClick={() => props.history.push('/reports')}>Reports</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}


// import IssueAddNavItem from '../containers/IssueAddContainer.jsx';



// const Header = (props) => (
//   <Navbar fluid>
//     <Navbar.Header>
//       <Navbar.Brand>Issue Tracker</Navbar.Brand>
//     </Navbar.Header>
//     <Nav>
//       <LinkContainer to="/issues">
//         <NavItem>Issues</NavItem>
//       </LinkContainer>
//       <LinkContainer to="/reports">
//         <NavItem>Reports</NavItem>
//       </LinkContainer>
//     </Nav>
//     <Nav pullRight>
//       <IssueAddNavItem showError={props.showError}/>
//       < NavDropdown id="user-dropdown" title={<Glyphicon glyph="option-horizontal" />} noCaret>
//         <MenuItem>Logout</MenuItem>
//       </NavDropdown>
//     </Nav>
//   </Navbar>
// );

Header.prototypes = {
  showError: PropTypes.func.isRequired,
  showSuccess: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styleSheet)(withToast(Header)));
