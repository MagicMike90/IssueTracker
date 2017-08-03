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
          {/* <IssueAddNavItem /> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}


Header.prototypes = {
  showError: PropTypes.func.isRequired,
  showSuccess: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styleSheet)(withToast(Header)));
