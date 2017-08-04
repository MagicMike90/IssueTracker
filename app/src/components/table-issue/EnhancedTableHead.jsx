import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';


export default class EnhancedTableHead extends Component {
    constructor(props) {
        super(props);
        this.createSortHandler = this.createSortHandler.bind(this);
    }

    createSortHandler(event, property) {
        this.props.onRequestSort(event, property);
    }
    render() {
        const { columnData, onSelectAllClick, order, orderBy ,checked} = this.props;
        const headCols = columnData.map(column =>
            <TableCell
                key={column.id}
                numeric={column.numeric}
                disablePadding={column.disablePadding}>
                <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={(evt) => this.createSortHandler(evt, column.id)}>
                    {column.label}
                </TableSortLabel>
            </TableCell>);
        return (
            <TableHead>
                <TableRow>
                    <TableCell checkbox>
                        <Checkbox onChange={onSelectAllClick} checked={checked}/>
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
    checked: PropTypes.bool.isRequired
};
