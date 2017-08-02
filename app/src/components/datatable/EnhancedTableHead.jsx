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
    { id: 'id', numeric: false, disablePadding: true, label: 'Id' },
    { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
    { id: 'owner', numeric: true, disablePadding: false, label: 'Owner' },
    { id: 'created', numeric: true, disablePadding: false, label: 'Created' },
    { id: 'effor', numeric: true, disablePadding: false, label: 'Effort' },
    { id: 'completion', numeric: true, disablePadding: false, label: 'Completion Date' },
    { id: 'title', numeric: true, disablePadding: false, label: 'Title' },
];

export default class EnhancedTableHead extends Component {
    constructor(props) {
        super(props);
        this.createSortHandler = this.createSortHandler.bind(this);
    }

    createSortHandler(property, event) {
        this.props.onRequestSort(event, property);
    }

    render() {
        const { onSelectAllClick, order, orderBy } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell checkbox>
                        <Checkbox onChange={onSelectAllClick} />
                    </TableCell>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                disablePadding={column.disablePadding}
                            >
                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={order}
                                    onClick={this.createSortHandler(column.id)}
                                >
                                    {column.label}
                                </TableSortLabel>
                            </TableCell>
                        );
                    }, this)}
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