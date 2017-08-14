
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { deleteBulkIssue, turnOnFilter, turnOffFilter } from '../../actions/issueActions'
import classNames from 'classnames';

import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';

import FilterListIcon from 'material-ui-icons/FilterList';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';


import IssueAddTableItem from './AddTableItem.jsx';
import FilterContextMenu from './FilterContextMenu.jsx';


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
  input: {
    margin: theme.spacing.unit,
  },
}));



class EnhancedTableToolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFilter: false,
    }

    this.openFilter = this.openFilter.bind(this);
    this.closeFilter = this.closeFilter.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
  }
  openFilter() {
    this.props.dispatch(turnOnFilter());
    // this.setState({ openFilter: true });
  }
  closeFilter() {
    this.props.dispatch(turnOffFilter());
    // this.setState({ openFilter: false });
  }
  deleteIssue() {
    this.props.dispatch(deleteBulkIssue(this.props.selected, this.props.location));
  }
  render() {
    const { selected, classes, dispatch } = this.props;

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
    if (this.props.openFilter) return (<FilterContextMenu history={this.props.history} closeFilter={this.closeFilter} />);
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
          <IconButton aria-label="Filter list" onClick={this.openFilter}>
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
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};
const mapStateToProps = (state, ownProps) => {
  const { openFilter } = state.issuesState;
  return {
    openFilter: openFilter
  }
};
const componentWithStyles = withStyles(toolbarStyleSheet)(EnhancedTableToolbar);
export default withRouter(connect(mapStateToProps)(componentWithStyles));
