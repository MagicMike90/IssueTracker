import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';

const styleSheet = createStyleSheet(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        background: theme.palette.background.paper,
    },
}));

const options = [
    '1',
    '2',
    '3',
];

class TableFooterDrowdown extends Component {
    constructor(props) {
        super(props);
        this.handleClickListItem = this.handleClickListItem.bind(this);
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.state = {
            anchorEl: undefined,
            open: false,
            selectedIndex: 1,
        }
    };

    handleClickListItem(event) {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleMenuItemClick(event, index) {
        this.setState({ selectedIndex: index, open: false });
    };

    handleRequestClose() {
        this.setState({ open: false });
    };

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <List>
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        aria-label="When device is locked"
                        onClick={this.handleClickListItem}
                    >
                        <ListItemText
                            primary={options[this.state.selectedIndex]}
                            disableTypography
                        />
                    </ListItem>
                </List>
                <Menu
                    id="lock-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    {options.map((option, index) =>
                        <MenuItem
                            key={option}
                            selected={index === this.state.selectedIndex}
                            onClick={event => this.handleMenuItemClick(event, index)}
                        >
                            {option}
                        </MenuItem>,
                    )}
                </Menu>
            </div>
        );
    }
}

TableFooterDrowdown.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(TableFooterDrowdown);