// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import keycode from 'keycode';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import { LinearProgress } from 'material-ui/Progress';

import EnhancedTableHead from './EnhancedTableHead.jsx';
import EnhancedTableToolbar from './EnhancedTableToolbar.jsx';
import EnhancedTableFooter from './EnhancedTableFooter.jsx';


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
      issues: []
    };

    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ issues: nextProps.issues });
  }
  handleRequestSort(event, property) {

    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const issues = this.state.issues.sort(
      (a, b) => (order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy]),
    );

    this.setState({ issues, order, orderBy });
  };

  handleSelectAllClick(event, checked) {
    if (checked) {
      this.setState({ selected: this.state.issues.map(issues => issues._id) });
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
    const { classes, isFetching } = this.props;
    const { order, orderBy, selected } = this.state;
    const issueRows = this.state.issues.map(issue => <IssueRow key={issue._id} issue={issue} isSelected={this.isSelected(issue._id)}
      handleClick={this.handleClick} handleKeyDown={this.handleKeyDown} />)


    return (
      <Paper className={classes.paper}>
        <EnhancedTableToolbar title="Issues" numSelected={selected.length} />
        {isFetching && <LinearProgress className={classes.progress} />}
        <Table>
          <EnhancedTableHead
            columnData={columnData}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={this.handleSelectAllClick}
            onRequestSort={this.handleRequestSort}
          />
          <TableBody>{issueRows}</TableBody>
        </Table>
        <EnhancedTableFooter />
      </Paper>
    );
  }
}

IssueDataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  issues: PropTypes.array.isRequired,
};

export default withStyles(styleSheet)(IssueDataTable);