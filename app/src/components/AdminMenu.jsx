import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';


const styleSheet = createStyleSheet(theme => ({
  root: {
  },
  avatar: {
    margin: theme.spacing.unit
  },
  flex: {
    flex: 1,
  },
}));

const options = [
  'Login',
  'Help',
];

class AdminMenu extends React.Component {
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
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleMenuItemClick(event, index) {
    this.setState({ selectedIndex: index, open: false }, () => {
      let query_string = qs.stringify({ status: options[this.state.selectedIndex].label });
      this.props.history.push({ search: query_string })
    });
  }

  handleRequestClose() {
    this.setState({ open: false });
  };
  render() {
    const { classes, login } = this.props;
    return (

      <div className={classes.root}>
        <IconButton color="contrast" className={classes.avatar} onClick={this.handleClickListItem}>
          <AccountCircleIcon />
        </IconButton>
        {/* <List>
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="When device is locked"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary="When device is locked"
              secondary={options[this.state.selectedIndex]}
            />
          </ListItem>
        </List> */}
        <Menu
          id="lock-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          MenuListProps={{
            style: {
              width: 200,
            },
          }}
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

const componentWithStyles = withStyles(styleSheet)(AdminMenu);
export default componentWithStyles;
