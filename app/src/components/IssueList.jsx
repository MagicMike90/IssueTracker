
import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { fetchIssuesIfNeeded, fetchIssues, deleteIssue } from '../actions/issueActions'

import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import qs from 'qs';
import { Button, Glyphicon, Table, Panel, Pagination } from 'react-bootstrap';

// import IssueAdd from './IssueAdd.jsx'
import IssueFilter from './IssueFilter.jsx'
import withToast from './withToast.jsx';
import IssueTable from './IssueTable.jsx'


const PAGE_SIZE = 10;
class IssueList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            issues: [],
            totalCount: 0,
        };
        // this.createIssue = this.createIssue.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.deleteIssue = this.deleteIssue.bind(this);
        this.selectPage = this.selectPage.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(fetchIssues(this.props.location, PAGE_SIZE));
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.search == this.props.location.search) return;
        this.props.dispatch(fetchIssuesIfNeeded(this.props.location, PAGE_SIZE));
    }

    setFilter(query) {
        let query_string = qs.stringify(query);
        this.props.history.push({ pathname: this.props.location.pathname, search: query_string })
    }

    deleteIssue(issue) {
        this.props.dispatch(deleteIssue(issue, this.props.location));
    }
    selectPage(eventKey) {
        // console.log('location', this.props.location.search);
        const query = Object.assign(this.props.location.search, { _page: eventKey });
        // console.log('selectPage', query);
        let query_string = qs.stringify({ _page: eventKey });
        // console.log('qs', qs);
        this.props.history.push({ pathname: this.props.location.pathname, search: query_string })
    }
    renderErrorMessage() {
        const { errorMessage } = this.props
        if (!errorMessage) {
            return null
        }

        return (
            <p style={{ backgroundColor: '#e99', padding: 10 }}>
                <b>{errorMessage}</b>
                {' '}
                <button onClick={this.handleDismissClick}>
                    Dismiss
        </button>
            </p>
        )
    }

    render() {
        let initFilter = qs.parse(this.props.location.search);
        { this.renderErrorMessage() }
        return (
            <div>
                <Panel collapsible header="Filter">
                    <IssueFilter setFilter={this.setFilter} initFilter={initFilter} />
                </Panel>
                <Pagination
                    items={Math.ceil(this.state.totalCount / PAGE_SIZE)}
                    activePage={parseInt(this.props.location.search._page || '1', 10)}
                    onSelect={this.selectPage} maxButtons={7} next prev boundaryLinks
                />
                <IssueTable issues={this.props.issues} deleteIssue={this.deleteIssue} />
                {/*<IssueAdd createIssue={this.createIssue} />*/}
            </div>
        );
    }
}
IssueList.propTypes = {
    location: PropTypes.object.isRequired,
    issues: PropTypes.array.isRequired,
    totalCount: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    showError: PropTypes.func.isRequired,
    showSuccess: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
};
const IssueListWithToast = withToast(IssueList);


const mapStateToProps = (state, ownProps) => {
    const issuesReducer = state.issuesReducer;
    return {
        issues: issuesReducer.issues,
        totalCount: issuesReducer.totalCount,
        isFetching: issuesReducer.isFetching,
        lastUpdated: issuesReducer.lastUpdated,
        error: issuesReducer.error
    }
};

export default connect(mapStateToProps)(IssueListWithToast);

