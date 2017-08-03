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

      <TableCell><Link to={`/stats/${issue._id}`}>
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
  { id: 'new', numeric: false, disablePadding: false, label: 'New' },
  { id: 'open', numeric: false, disablePadding: false, label: 'Open' },
  { id: 'assigned', numeric: false, disablePadding: false, label: 'Assigned' },
  { id: 'fixed', numeric: false, disablePadding: false, label: 'Fixed' },
  { id: 'verified', numeric: false, disablePadding: false, label: 'Verified' },
  { id: 'closed', numeric: false, disablePadding: false, label: 'Closed' },
];
class ReportDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      stats: []
    };

    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps, ) {
    this.setState({ stats: nextProps.stats });
  }
  handleRequestSort(event, property) {

    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const stats = this.state.stats.sort(
      (a, b) => (order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy]),
    );

    this.setState({ stats, order, orderBy });
  };

  handleSelectAllClick(event, checked) {
    if (checked) {
      this.setState({ selected: this.state.stats.map(stats => stats._id) });
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
    const issueRows = this.state.stats.map(issue => <IssueRow key={issue._id} issue={issue} isSelected={this.isSelected(issue._id)}
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
      </Paper>
    );
  }
}

ReportDataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  stats: PropTypes.array.isRequired,
};

export default withStyles(styleSheet)(ReportDataTable);
