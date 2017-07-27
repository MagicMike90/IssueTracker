
import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { fetchIssuesIfNeeded } from '../actions/issueActions'

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
        console.log('componentDidMount');
        this.props.dispatch(fetchIssuesIfNeeded(this.props.location, PAGE_SIZE));
    }

    componentDidUpdate(prevProps) {
        console.log('componentDidUpdate');
        // console.log('prevProps.location.search',prevProps.location.search);
        // console.log(' this.props.location.search', this.props.location.search);
        // if(prevProps.location.search == this.props.location.search) return;
        const oldQuery = qs.parse(prevProps.location.search);
        const newQuery = qs.parse(this.props.location.search);

        if (newQuery === undefined) return;

        // When loading data, we asynchronously updated the state,
        // and React has no way of knowing that it was done as part
        // of the lifecycle method. Even if we had used the method
        // ComponentWillReceiveProps, we would have had to compare
        // the old and new.
        if (oldQuery.status === newQuery.status
            && oldQuery.effort_gte === newQuery.effort_gte
            && oldQuery.effort_lte === newQuery.effort_lte
            && oldQuery._page === newQuery._page) {
            return;
        }


        this.props.dispatch(fetchIssuesIfNeeded(this.props.location, PAGE_SIZE));
    }

    setFilter(query) {
        let query_string = qs.stringify(query);
        this.props.history.push({ pathname: this.props.location.pathname, search: query_string })
    }

    deleteIssue(id) {
        fetch(`/api/issues/${id}`, { method: 'DELETE' }).then(response => {
            if (!response.ok) this.props.showError('Failed to delete issue');
            else this.props.dispatch(fetchIssuesIfNeeded(this.props.location, PAGE_SIZE));
        });
    }
    selectPage(eventKey) {
        // console.log('location', this.props.location.search);
        const query = Object.assign(this.props.location.search, { _page: eventKey });
        // console.log('selectPage', query);
        let query_string = qs.stringify({ _page: eventKey });
        // console.log('qs', qs);
        this.props.history.push({ pathname: this.props.location.pathname, search: query_string })
    }
    render() {
        let initFilter = qs.parse(this.props.location.search);
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
    dispatch: PropTypes.func.isRequired,
};
const IssueListWithToast = withToast(IssueList);


const mapStateToProps = (state, ownProps) => {
    const issuesReducer = state.issuesReducer;
    return {
        issues: issuesReducer.issues,
        totalCount: issuesReducer.totalCount,
        isFetching: issuesReducer.isFetching,
        lastUpdated: issuesReducer.lastUpdated
    }
};

export default connect(mapStateToProps)(IssueList);

