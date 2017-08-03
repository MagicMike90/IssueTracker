import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';

const styleSheet = createStyleSheet({
  root: {
    width: '100%'
  },
  progressRow: {
    height: 0
  },
  progressCell: {
    position: "relative",
    overflow: "visible"
  },
  progress: {
    width: '100%',
    height: 2,
    position: "absolute"
  }
});


class TableLinearProgress extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classes = this.props.classes;
    return (
      <TableHead>
        <TableRow classes={{ root: classes.progressRow }}>
          <TableCell disablePadding={true} colSpan={this.props.colSpan} className={classes.progressCell}>
             <LinearProgress className={classes.progress} /> 
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

TableLinearProgress.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(TableLinearProgress);
