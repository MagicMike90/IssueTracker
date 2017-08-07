import React, { Component } from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui-icons/Search';
import ClearIcon from 'material-ui-icons/Clear';
import ClearAllIcon from 'material-ui-icons/ClearAll';
import Input from 'material-ui/Input/Input';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';


import IssueAddTableItem from './AddTableItem.jsx';
import FilterStatusDropdown from './FilterStatusDropdown.jsx';

const toolbarStyleSheet = createStyleSheet(theme => ({
    root: {
        paddingRight: 2,
    },
    iconRoot: {
        width: 48,
        height: 48
    },
    highlight:
    theme.palette.type === 'light'
        ? {
            color: theme.palette.accent.A700,
            backgroundColor: theme.palette.accent.A100,
        }
        : {
            color: theme.palette.accent.A100,
            backgroundColor: theme.palette.accent.A700,
        },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
        marginLeft: theme.spacing.unit,
    }
}))
class FilterContextMenu extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.clearSearchField = this.clearSearchField.bind(this);
    }
    onChange(event) {
        console.log('event', event.target.value);
    }
    clearSearchField() {

    }
    render() {
        const classes = this.props.classes;
        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: false,
                })}
            >
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <Input
                    placeholder="Search..."
                    className={classes.input}
                    fullWidth
                    disableUnderline
                    inputProps={{
                        'aria-label': 'Search',
                    }}
                    onChange={this.onChange}
                />
                <IconButton aria-label="Clear" onClick={this.clearSearchField}>
                    <ClearIcon />
                </IconButton>
                <div className={classes.title}>
                    <Typography type="subheading" >
                        Status:
                    </Typography>
                </div>
                <FilterStatusDropdown history={this.props.history} />

                <div className={classes.spacer} />
                <IconButton aria-label="Clear" onClick={this.props.closeFilter}>
                    <ClearAllIcon />
                </IconButton>

                <IssueAddTableItem />

            </Toolbar>
        )
    }
}
const componentWithStyles = withStyles(toolbarStyleSheet)(FilterContextMenu);
export default componentWithStyles;
