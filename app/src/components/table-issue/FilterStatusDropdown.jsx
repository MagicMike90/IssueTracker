import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
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
  { label: '(Any)', value: '' },
  { label: 'Open', value: 'open' },
  { label: 'Assigned', value: 'assigned' },
  { label: 'Fixed', value: 'fixed' },
  { label: 'Verified', value: 'verified' },
  { label: 'Closed', value: 'closed' }
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
  componentWillReceiveProps(nextPros) {
    console.log('componentWillReceiveProps');
  }
  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate');
  }
  handleClickListItem(event) {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleMenuItemClick(event, index) {
    console.log('index', index);
    this.setState({ selectedIndex: index, open: false }, () => {
      let query_string = qs.stringify({ status: options[this.state.selectedIndex].label });
      this.props.history.push({ search: query_string })
    });
  }

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
              secondary={options[this.state.selectedIndex].label}
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
              key={option.label}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option.label}
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
