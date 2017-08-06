
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
  }
  
  render() {
    const { classes, pageSize, totalCount, pageNum } = this.props;
    return (
      <Toolbar className={classNames(classes.root, { [classes.highlight]: false })}>
        <div className={classes.spacer} />
        {/* <TableFooterDrowdown /> */}
        <div className={classes.title}>
          <Typography type="caption" noWrap={true}>{pageNum} - {pageSize + pageNum - 1} of {totalCount}</Typography>
        </div>
        <div className={classNames(classes.actions, classes.leftNavBtn)}>
          <IconButton aria-label="last page" disabled={pageNum == 1} onClick={this.props.lastPage}>
            <ChevronLeft />
          </IconButton>
        </div>
        <div className={classes.actions}>
          <IconButton aria-label="next page" onClick={this.props.nextPage}>
            <ChevronRight />
          </IconButton>
        </div>
      </Toolbar >
    );
  }
}


EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  pageNum: PropTypes.number.isRequired,
};

const componentWithStyles = withStyles(toolbarStyleSheet)(EnhancedTableToolbar);
export default withRouter(connect()(componentWithStyles));