import React from 'react';
import { Link } from 'react-router-dom';

export default class IssueEdit extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <p>This is a placeholder for editing issue {this.props.match.params.id}.</p>
                <Link to="/issues">Back to issue list</Link>
            </div>
        );
    }
}
IssueEdit.propTypes = {
    match: React.PropTypes.object.isRequired,
};
