
import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { fetchIssuesIfNeeded } from '../actions/fetch'

import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Button, Glyphicon, Table, Panel, Pagination } from 'react-bootstrap';

// import IssueAdd from './IssueAdd.jsx'
import IssueFilter from './IssueFilter.jsx'
import withToast from './withToast.jsx';
import IssueTable from './IssueTable.jsx'



const PAGE_SIZE = 10;
class IssueList extends React.Component {
    static dataFetcher({ urlBase, location }) {
        // construct query string request issue
        const query = Object.assign({}, queryString.parse(location.search));
        const pageStr = query._page;
        if (pageStr) {
            delete query._page;
            query._offset = (parseInt(pageStr, 10) - 1) * PAGE_SIZE;
        }
        query._limit = PAGE_SIZE;

        const search = Object.keys(query).map(k => `${k}=${query[k]}`).join('&');
        return fetch(`${urlBase || ''}/api/issues?${search}`).then(response => {
            if (!response.ok) return response.json().then(error => Promise.reject(error));
            return response.json().then(data => ({ IssueList: data }));
        });
    }

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
        this.props.dispatch(fetchIssuesIfNeeded(this.props.location, PAGE_SIZE));
    }

    componentDidUpdate(prevProps) {
        console.log('componentDidUpdate');
        const oldQuery = queryString.parse(prevProps.location.search);
        const newQuery = queryString.parse(this.props.location.search);

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
            console.log('componentDidUpdate', 'reject');
            return;
        }


        // this.loadData();
        this.props.dispatch(fetchIssuesIfNeeded(this.props.location, PAGE_SIZE));
    }

    setFilter(query) {
        // console.log('setFilter',this.props);
        let qs = queryString.stringify(query);
        this.props.history.push({ pathname: this.props.location.pathname, search: qs })
        // this.props.router.push({ pathname: this.props.location.pathname, query });
    }

    loadData() {
        IssueList.dataFetcher({ location: this.props.location })
            .then(data => {
                console.log('data', data);
                const issues = data.IssueList.records;
                issues.forEach(issue => {
                    issue.created = new Date(issue.created);
                    if (issue.completionDate) {
                        issue.completionDate = new Date(issue.completionDate);
                    }
                });
                this.setState({ issues, totalCount: data.IssueList.metadata.totalCount });
            }).catch(err => {
                this.props.showError(`Error in fetching data from server: ${err}`);
            });
    }
    deleteIssue(id) {
        fetch(`/api/issues/${id}`, { method: 'DELETE' }).then(response => {
            if (!response.ok) this.props.showError('Failed to delete issue');
            else this.loadData();
        });
    }
    selectPage(eventKey) {
        // console.log('location', this.props.location.search);
        const query = Object.assign(this.props.location.search, { _page: eventKey });
        // console.log('selectPage', query);
        let qs = queryString.stringify({ _page: eventKey });
        // console.log('qs', qs);
        this.props.history.push({ pathname: this.props.location.pathname, search: qs })
    }
    render() {
        let initFilter = queryString.parse(this.props.location.search);
        console.log('this.props.issues', this.props);
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
IssueListWithToast.dataFetcher = IssueList.dataFetcher;


const issuesDataTransform = data => {
    console.log('data', data);
    const issues = data.records;
    issues.forEach(issue => {
        issue.created = new Date(issue.created);
        if (issue.completionDate) {
            issue.completionDate = new Date(issue.completionDate);
        }
    });
    return { issues, totalCount: data.metadata.totalCount };
}
// Map store state to props
// const mapStateToProps = (state, ownProps) => {
//     const { issues ,totalCount } = issuesDataTransform(state.issuesReducer);
//     return {
//         issues: issues,
//         totalCount: totalCount,
//         isFetching: state.issuesReducer.isFetching,
//         lastUpdated: state.issuesReducer.lastUpdated
//     }
// };
const mapStateToProps = (state, ownProps) => ({
    issues: state.issuesReducer.data.issues,
    totalCount: state.issuesReducer.data.totalCount,
    isFetching: state.issuesReducer.isFetching,
    lastUpdated: state.issuesReducer.lastUpdated  
});

export default connect(mapStateToProps)(IssueList);

