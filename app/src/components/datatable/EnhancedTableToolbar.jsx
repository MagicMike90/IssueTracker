
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';

import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import { withStyles, createStyleSheet } from 'material-ui/styles';


const toolbarStyleSheet = createStyleSheet(theme => ({
  root: {
    paddingRight: 2,
  },
  highlight:
  theme.palette.type === 'light'
    ? {
      color: theme.palette.accent.A700,
      backgroundColor: theme.palette.accent.A100,
    }
    : {
      color: theme.palette.accent.A100,
      backgroundColor: theme.palette.accent.A700,
    },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));


class EnhancedTableToolbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { numSelected, classes } = this.props;
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0
            ? <Typography type="subheading">
              {numSelected} selected
            </Typography>
            : <Typography type="title">{this.props.title}</Typography>}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0
            ? <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
            : <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>}
        </div>
      </Toolbar>
    );
  }
}


EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};


export default withStyles(toolbarStyleSheet)(EnhancedTableToolbar);
