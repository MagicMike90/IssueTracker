
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { deleteBulkIssue } from '../../actions/issueActions'
import classNames from 'classnames';

import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import { withStyles, createStyleSheet } from 'material-ui/styles';


import IssueAddTableItem from './IssueAddTableItem.jsx';


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

class ContextMenu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.actions}>
          <IconButton aria-label="Filter list">
            <FilterListIcon />
          </IconButton>}
        </div>
        <div className={classes.actions}>
          <IssueAddTableItem />
        </div>
      </div>
    );
  }
}
const StyleContextMenu = withStyles(toolbarStyleSheet)(ContextMenu);


class EnhancedTableToolbar extends Component {
  constructor(props) {
    super(props);
    this.deleteIssue = this.deleteIssue.bind(this);
  }

  deleteIssue() {
    this.props.dispatch(deleteBulkIssue(this.props.selected, this.props.location));
  }
  render() {
    const { selected, classes } = this.props;

    if (selected.length > 0) return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: selected.length > 0,
        })}
      >
        <div className={classes.title}>
          <Typography type="subheading" color="secondary">
            {selected.length} selected
            </Typography>
        </div>

        <div className={classes.spacer} />

        <div className={classes.actions}>
          <IconButton aria-label="Delete" onClick={this.deleteIssue}>
            <DeleteIcon />
          </IconButton>
        </div>
      </Toolbar>
    )
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: selected.length > 0,
        })}
      >
        <div className={classes.title}>
          <Typography type="title">{this.props.title}</Typography>
        </div>
        <div className={classes.spacer} />

        <div className={classes.actions}>
          <IconButton aria-label="Filter list">
            <FilterListIcon />
          </IconButton>
        </div>
        <div className={classes.actions}>
          <IssueAddTableItem />
        </div>

      </Toolbar>
    );
  }
}


EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired,
  deleteIssue: PropTypes.func.isRequired
};

const componentWithStyles = withStyles(toolbarStyleSheet)(EnhancedTableToolbar);
export default connect()(componentWithStyles);
