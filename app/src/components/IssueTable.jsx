import React from 'react';
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom';
import { Button, Glyphicon, Table, Panel, Pagination } from 'react-bootstrap';


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
    issue: PropTypes.object.isRequired,
    deleteIssue: PropTypes.func.isRequired,
};

const IssueTable = (props) =>{
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
    issues: PropTypes.array.isRequired,
    deleteIssue: PropTypes.func.isRequired,
};
export default IssueTable;
