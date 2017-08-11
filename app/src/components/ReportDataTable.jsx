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

import EnhancedTableHead from './table-report/EnhancedTableHead.jsx';
import EnhancedTableToolbar from './table-report/EnhancedTableToolbar.jsx';


const columnData = [
  { id: 'new', numeric: true, disablePadding: true, label: 'New' },
  { id: 'open', numeric: true, disablePadding: true, label: 'Open' },
  { id: 'assigned', numeric: true, disablePadding: true, label: 'Assigned' },
  { id: 'fixed', numeric: true, disablePadding: true, label: 'Fixed' },
  { id: 'verified', numeric: true, disablePadding: true, label: 'Verified' },
  { id: 'closed', numeric: true, disablePadding: true, label: 'Closed' },
];

const StatRow = (props) => {

  return (
    <TableRow hover>
      <TableCell>{props.owner}</TableCell>
      {columnData.map((data, index) => (<TableCell numeric disablePadding compact key={index}>{props.counts[data.label]}</TableCell>))}
    </TableRow>
  )
}
StatRow.propTypes = {
  owner: PropTypes.string.isRequired,
  counts: PropTypes.object.isRequired
};


const styleSheet = createStyleSheet(theme => ({
  paper: {
    width: '100%',
    overflowX: 'auto',
  },
  progress: {
    width: '100%',
    height: 2
  }
}));

class ReportDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      stats: {}
    };

    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
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
    // const issueRows = this.state.stats.map(issue => <IssueRow key={issue._id} issue={issue} isSelected={this.isSelected(issue._id)}
    //   handleClick={this.handleClick} handleKeyDown={this.handleKeyDown} />)


    // console.log('Object.keys(this.state.stats)',Object.keys(this.state.stats));
    return (
      <Paper className={classes.paper}>
        <EnhancedTableToolbar title="Statistics" numSelected={selected.length} />
        {isFetching && <LinearProgress className={classes.progress} />}
        <Table>
          <EnhancedTableHead
            columnData={columnData}
            order={order}
            orderBy={orderBy}
            onRequestSort={this.handleRequestSort}
          />
          <TableBody>
            {Object.keys(this.state.stats).map((owner, index) =>
              < StatRow key={index} owner={owner}
                counts={this.state.stats[owner]} />
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

ReportDataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(ReportDataTable);
