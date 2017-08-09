import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Header from '../components/Header.jsx';
import Routes from './Routes.jsx';
import NotificationContainer from './NotificationContainer.jsx';
import SideMenu from '../components/SideMenu.jsx';
import Grid from 'material-ui/Grid';

// withRouter IssueList can use this.props.router to access the router object.(this.props.location)
export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={2} only="md">
                        <SideMenu />
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <Header />
                        <div className="container-fluid">
                            <Routes />
                        </div>
                    </Grid>

                </Grid>
                <NotificationContainer />
            </div>
        );
    }
}


