
import React from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Button, Glyphicon, Table, Panel } from 'react-bootstrap';

// import IssueAdd from './IssueAdd.jsx'
import IssueFilter from './IssueFilter.jsx'
import Toast from './Toast.jsx';

const IssueRow = (props) => {
    function onDeleteClick() {
        props.deleteIssue(props.issue._id);
    }
    const issue = props.issue;
    return (
        <tr>
            <td><Link to={`/issues/${issue._id}`}>
                {issue._id.substr(-4)}</Link></td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            <td>{issue.created.toDateString()}</td>
            <td>{issue.effort}</td>
            <td>{issue.completionDate ?
                issue.completionDate.toDateString() : ''}</td>
            <td>{issue.title}</td>
            <td>
                <Button bsSize="xsmall" onClick={onDeleteClick}><Glyphicon glyph="trash" /></Button>
            </td>
        </tr>
    )
}
IssueRow.propTypes = {
    issue: React.PropTypes.object.isRequired,
    deleteIssue: React.PropTypes.func.isRequired,
};
function IssueTable(props) {
    const borderedStyle = { border: "1px solid silver", padding: 6 };
    const issueRows = props.issues.map(issue => <IssueRow key={issue._id} issue={issue} deleteIssue={props.deleteIssue} />)
    return (
        <Table bordered condensed hover responsive>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Owner</th>
                    <th>Created</th>
                    <th>Effort</th>
                    <th>Completion Date</th>
                    <th>Title</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>{issueRows}</tbody>
        </Table>
    )
}
IssueTable.propTypes = {
    issues: React.PropTypes.array.isRequired,
    deleteIssue: React.PropTypes.func.isRequired,
};
export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = {
            issues: [],
            toastVisible: false, toastMessage: '', toastType: 'success'
        };
        // this.createIssue = this.createIssue.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.deleteIssue = this.deleteIssue.bind(this);
        this.showError = this.showError.bind(this);
        this.dismissToast = this.dismissToast.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    componentDidUpdate(prevProps) {
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
            && oldQuery.effort_lte === newQuery.effort_lte) {
            return;
        }
        console.log('componentDidUpdate', 'loadData');
        this.loadData();
    }

    setFilter(query) {
        // console.log('setFilter',this.props);
        let qs = queryString.stringify(query);
        this.props.history.push({ pathname: this.props.location.pathname, search: qs })
        // this.props.router.push({ pathname: this.props.location.pathname, query });
    }
    showError(message) {
        this.setState({
            toastVisible: true, toastMessage: message, toastType:
            'danger'
        });
    }
    dismissToast() {
        this.setState({ toastVisible: false });
    }
    loadData() {
        console.log('this.props.location', this.props.location);
        fetch(`/api/issues${this.props.location.search}`).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    data.records.forEach(issue => {
                        issue.created = new Date(issue.created);
                        if (issue.completionDate)
                            issue.completionDate = new Date(issue.completionDate);
                    });
                    this.setState({
                        issues: data.records
                    });
                });
            } else {
                response.json().then(error => {
                    this.showError("Failed to fetch issues:" + error.message)
                });
            }
        }).catch(err => {
            this.showError("Error in fetching data from server:", err);
        });
    }
    deleteIssue(id) {
        fetch(`/api/issues/${id}`, { method: 'DELETE' }).then(response => {
            if (!response.ok) this.showError('Failed to delete issue');
            else this.loadData();
        });
    }
    render() {
        let initFilter = queryString.parse(this.props.location.search);
        return (
            <div>
                <Panel collapsible header="Filter">
                    <IssueFilter setFilter={this.setFilter} initFilter={initFilter} />
                </Panel>
                <IssueTable issues={this.state.issues} deleteIssue={this.deleteIssue} />
                {/*<IssueAdd createIssue={this.createIssue} />*/}
                <Toast
                    showing={this.state.toastVisible}
                    message={this.state.toastMessage}
                    onDismiss={this.dismissToast} bsStyle={this.state.toastType}
                />
            </div>
        );
    }
}
IssueList.propTypes = {
    location: React.PropTypes.object.isRequired
};
