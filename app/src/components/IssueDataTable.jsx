// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchIssuesIfNeeded, fetchIssues } from '../actions/issueActions'

import { withStyles, createStyleSheet } from 'material-ui/styles';
import keycode from 'keycode';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';

import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import { LinearProgress } from 'material-ui/Progress';

import EnhancedTableHead from './table-issue/EnhancedTableHead.jsx';
import EnhancedTableToolbar from './table-issue/EnhancedTableToolbar.jsx';
import EnhancedTableFooter from './table-issue/EnhancedTableFooter.jsx';


const IssueRow = (props) => {
  function onDeleteClick() {
    props.deleteIssue(props.issue);
  }
  const { issue, isSelected } = props;

  return (
    <TableRow
      hover
      onClick={event => props.handleClick(event, issue._id)}
      onKeyDown={event => props.handleKeyDown(event, issue._id)}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex="-1"
      key={issue._id}
      selected={isSelected}
    >
      <TableCell checkbox>
        <Checkbox checked={isSelected} />
      </TableCell>
      <TableCell><Link to={`/issues/${issue._id}`}>
        {issue._id.substr(-4)}</Link></TableCell>
      <TableCell>{issue.status}</TableCell>
      <TableCell>{issue.owner}</TableCell>
      <TableCell>{issue.created.toDateString()}</TableCell>
      <TableCell>{issue.effort}</TableCell>
      <TableCell>{issue.completionDate ?
        issue.completionDate.toDateString() : ''}</TableCell>
      <TableCell>{issue.title}</TableCell>
    </TableRow>
  )
}
IssueRow.propTypes = {
  issue: PropTypes.object.isRequired,
};


const styleSheet = createStyleSheet(theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  progress: {
    width: '100%',
    height: 2
  }
}));
const columnData = [
  { id: 'id', numeric: false, disablePadding: false, label: 'Id' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'owner', numeric: false, disablePadding: false, label: 'Owner' },
  { id: 'created', numeric: false, disablePadding: false, label: 'Created' },
  { id: 'effor', numeric: false, disablePadding: false, label: 'Effort' },
  { id: 'completion', numeric: false, disablePadding: false, label: 'Completion Date' },
  { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
];
class IssueDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      pageSize: 10,
      pageNum: 1
    };

    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.setFilter = this.setFilter.bind(this);
    this.selectPage = this.selectPage.bind(this);
  }
  componentWillReceiveProps(nextPros) {
    const newSelected = this.state.selected.filter(function (id) {
      return nextPros.deletedIssues.indexOf(id) === -1;
    });
    this.setState({ selected: newSelected });
  }
  componentDidMount() {
    this.props.dispatch(fetchIssues(this.props.location, this.state.pageSize));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search != this.props.location.search
      || prevProps.deletedIssues.length != this.props.deletedIssues.length) {
      const { issues } = this.props;
      this.props.dispatch(fetchIssues(this.props.location, this.state.pageSize));
    }
  }

  setFilter(query) {
    let query_string = qs.stringify(query);
    this.props.history.push({ pathname: this.props.location.pathname, search: query_string })
  }


  selectPage(eventKey) {
    // console.log('location', this.props.location.search);
    const query = Object.assign(this.props.location.search, { _page: eventKey });
    // console.log('selectPage', query);
    let query_string = qs.stringify({ _page: eventKey });
    // console.log('qs', qs);
    this.props.history.push({ pathname: this.props.location.pathname, search: query_string })
  }
  handleRequestSort(event, property) {

    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const issues = this.props.issues.sort(
      (a, b) => (order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy]),
    );

    this.setState({ issues, order, orderBy });
  };

  handleSelectAllClick(event, checked) {
    if (checked) {
      this.setState({ selected: this.props.issues.map(issues => issues._id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleKeyDown(event, id) {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  };

  handleClick(event, id) {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected(id) {
    return this.state.selected.indexOf(id) !== -1;
  }

  render() {
    const { classes, isFetching, totalCount } = this.props;
    const { order, orderBy, selected } = this.state;
    const issueRows = this.props.issues.map(issue => <IssueRow key={issue._id} issue={issue} isSelected={this.isSelected(issue._id)}
      handleClick={this.handleClick} handleKeyDown={this.handleKeyDown} />)


    return (
      <Paper className={classes.paper}>
        <EnhancedTableToolbar title="Issues" selected={selected} deleteIssue={this.deleteIssue} />
        {isFetching && <LinearProgress className={classes.progress} />}
        <Table>
          <EnhancedTableHead
            columnData={columnData}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={this.handleSelectAllClick}
            onRequestSort={this.handleRequestSort}
            checked={selected.length == this.state.pageSize}
          />
          <TableBody>{issueRows}</TableBody>
        </Table>
        <EnhancedTableFooter
          issueSize={this.props.issues.length}
          pageSize={this.state.pageSize}
          lastPage={this.lastPage}
          nextPage={this.nextPage} />
      </Paper>
    );
  }
}

IssueDataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  issues: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};
const mapStateToProps = (state, ownProps) => {
  const { issues, totalCount, isFetching, lastUpdated, deletedIssues, pageSize, pageNum, offset } = state.issuesState;
  return {
    issues: issues,
    totalCount: totalCount,
    isFetching: isFetching,
    lastUpdated: lastUpdated,
    deletedIssues: deletedIssues,
    pageNum: pageNum,
    offset: offset
  }
};


const componentWithStyles = withStyles(styleSheet)(IssueDataTable);
export default withRouter(connect(mapStateToProps)(componentWithStyles));
