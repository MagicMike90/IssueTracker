import React, { Component } from 'react';
import PropTypes from 'prop-types'

import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

const columnData = [
    { id: 'id', numeric: false, disablePadding: false, label: 'Id' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'owner', numeric: false, disablePadding: false, label: 'Owner' },
    { id: 'created', numeric: false, disablePadding: false, label: 'Created' },
    { id: 'effor', numeric: false, disablePadding: false, label: 'Effort' },
    { id: 'completion', numeric: false, disablePadding: false, label: 'Completion Date' },
    { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
];


export default class EnhancedTableHead extends Component {
    constructor(props) {
        super(props);
        this.createSortHandler = this.createSortHandler.bind(this);
    }

    createSortHandler(event, property) {
        this.props.onRequestSort(event, property);
    }
    render() {
        const { onSelectAllClick, order, orderBy } = this.props;
        const headCols = columnData.map(column =>
            <TableCell
                key={column.id}
                numeric={column.numeric}
                disablePadding={column.disablePadding}>
                <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={(evt)=> this.createSortHandler(evt, column.id)}>
                    {column.label}
                </TableSortLabel>
            </TableCell>);
        return (
            <TableHead>
                <TableRow>
                    <TableCell checkbox>
                        <Checkbox onChange={onSelectAllClick} />
                    </TableCell>
                    {headCols}
                </TableRow>
            </TableHead>
        );
    }
}
EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
};
