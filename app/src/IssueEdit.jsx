import React from 'react';
import { Link } from 'react-router-dom';

export default class IssueEdit extends React.Component {
    render() {
        return (
            <div>
                <p>This is a placeholder for editing issue {this.props.params.id}.</p>
                <Link to="/issues">Back to issue list</Link>Í
            </div>
        );
    }
}
IssueEdit.propTypes = {
    params: React.PropTypes.object.isRequired,
};
