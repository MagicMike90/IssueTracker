import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet(theme => ({
  root: {
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const options = [
  '(Any)',
  'Open',
  'Assigned',
  'Fixed',
  'Verified',
  'Closed'
];

class FilterStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: undefined,
      open: false,
      selectedIndex: 0,
    };

    this.handleClickListItem = this.handleClickListItem.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleClickListItem(event) {
    // console.log('event.currentTarget', event.currentTarget);
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleMenuItemClick(event, index) {
    this.setState({ selectedIndex: index, open: false });
  };

  handleRequestClose() {
    this.setState({ open: false });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <List>
          <ListItem
            button
            dense
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="Filter status"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              secondary={options[this.state.selectedIndex]}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {options.map((option, index) =>
            <MenuItem
              key={option}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>,
          )}
        </Menu>
      </div>
    );
  }
}

FilterStatus.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(FilterStatus);
