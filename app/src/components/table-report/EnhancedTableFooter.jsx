
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';

import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import ChevronRight from 'material-ui-icons/ChevronRight';
import FilterListIcon from 'material-ui-icons/FilterList';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import TableFooterDrowdown from "./TableFooterDrowdown.jsx"


const toolbarStyleSheet = createStyleSheet(theme => ({
  root: {
    paddingRight: 2,
    borderTop: "1px solid rgba(0, 0, 0, 0.075)"
  },
  highlight: {
    color: theme.palette.accent.A100,
    backgroundColor: theme.palette.accent.A700,
  },
  spacer: {
    flex: '1 1 100%',
  },
  caption: {
    marginLeft: 15,
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  leftNavBtn: {
    marginLeft: 20
  },
  title: {

  },
}));


class EnhancedTableToolbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <Toolbar className={classNames(classes.root, { [classes.highlight]: false })}>
        <div className={classes.spacer} />
        <TableFooterDrowdown />
        <div className={classes.title}>
          <Typography type="caption" noWrap={true}>1 - 5 of 883</Typography>
        </div>
        <div className={classNames(classes.actions, classes.leftNavBtn)}>
          <IconButton aria-label="last page">
            <ChevronLeft />
          </IconButton>
        </div>
        <div className={classes.actions}>
          <IconButton aria-label="next page">
            <ChevronRight />
          </IconButton>
        </div>
      </Toolbar >
    );
  }
}


EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(toolbarStyleSheet)(EnhancedTableToolbar);
