// @flow weak

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
// import Paper from 'material-ui/Paper';
// import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
// import Typography from 'material-ui/Typography';
// import PaperStyle from '../../theme/Paper'

import PaperWrapper from '../PaperWrapper.jsx'


function EventTraker(props) {
  const classes = props.classes;
  return (
    <div>
        <List>
          <ListItem dense button>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
            <ListItemText primary="Ben Gao - bengao committed changeset d73c6137414c156333154e3fae13b8c108c24b90 saying:FLEAT-3043 tax invoice to AWS S3 " secondary="Jan 9, 2016" />
          </ListItem>
          <Divider />
          <ListItem dense button>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
            <ListItemText primary="Work" secondary="Jan 7, 2016" />
          </ListItem>
        </List>
    </div>
  );
}

EventTraker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default PaperWrapper(EventTraker, "Recent Activities");
