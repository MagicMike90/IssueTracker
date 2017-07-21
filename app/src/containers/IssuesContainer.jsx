import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { addIssue } from '../actions/fetch.js'

import IssueList from '../components/IssueList.jsx' 

IssueList.propTypes = {
    location: PropTypes.object.isRequired,
    issues: PropTypes.array.isRequired
};

const mapStateToProps = (state, ownProps) => {  
    issues: state.issues
}

export default connect(mapStateToProps)(IssueList);
