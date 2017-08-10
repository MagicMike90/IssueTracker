import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Header from '../components/Header.jsx';
import Routes from './Routes.jsx';
import NotificationContainer from './NotificationContainer.jsx';
import SideMenu from '../components/SideMenu.jsx';
import Grid from 'material-ui/Grid'
import { withStyles, createStyleSheet } from 'material-ui/styles';


const styleSheet = createStyleSheet(theme => ({
    container: {

    },
    right: {
        width: 'calc(100% - 250px)',
        float: 'right'
    },
    content: {
        margin: theme.spacing.unit,
    }
}));

// withRouter IssueList can use this.props.router to access the router object.(this.props.location)
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const classes = this.props.classes;

        return (
            // <div className={classes.container}>
            //     <div className={classes.right} >
            //         <Header />
            //         <div className={classes.content}>
            //             <Routes />
            //             <NotificationContainer />
            //         </div>
            //     </div>

            //     <SideMenu className={classes.sidebar} />
            // </div >

            <div>
                <Header />
                <div className={classes.content}>
                    <Routes />
                </div>
                <NotificationContainer />
            </div >
        );
    }
}

export default withStyles(styleSheet)(App);
