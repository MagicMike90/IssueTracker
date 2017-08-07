
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';
import qs from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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

    this.nextPage = this.nextPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
  }
  travelPage(page) {
    const next_page = parseInt(this.props.pageNum, 10) + page;
    let query_string = qs.stringify({ _page: next_page });
    this.props.history.push({ pathname: this.props.location.pathname, search: query_string });
  }
  nextPage(eventKey) {
    this.travelPage(1);
  }
  lastPage(eventKey) {
    this.travelPage(-1);
  }
  render() {
    const { classes, totalCount, offset, issueSize } = this.props;
    const rowBegin = offset + 1;
    const rowEnd = offset + issueSize;

    return (
      <Toolbar className={classNames(classes.root, { [classes.highlight]: false })}>
        <div className={classes.spacer} />
        {/* <TableFooterDrowdown /> */}
        <div className={classes.title}>
          <Typography type="caption" noWrap={true}>{rowBegin} - {rowEnd} of {totalCount}</Typography>
        </div>
        <div className={classNames(classes.actions, classes.leftNavBtn)}>
          <IconButton aria-label="last page" disabled={rowBegin == 1} onClick={this.lastPage}>
            <ChevronLeft />
          </IconButton>
        </div>
        <div className={classes.actions}>
          <IconButton aria-label="next page" disabled={rowEnd == totalCount} onClick={this.nextPage}>
            <ChevronRight />
          </IconButton>
        </div>
      </Toolbar >
    );
  }
}


EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  totalCount: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  issueSize: PropTypes.number.isRequired,
};
const mapStateToProps = (state, ownProps) => {
  const { issues, totalCount, isFetching, lastUpdated, deletedIssues, pageSize, pageNum, offset } = state.issuesState;
  return {
    issues: issues,
    totalCount: totalCount,
    pageNum: pageNum,
    offset: offset
  }
};
const componentWithStyles = withStyles(toolbarStyleSheet)(EnhancedTableToolbar);
export default withRouter(connect(mapStateToProps)(componentWithStyles));
