import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { addIssue } from '../actions'

import IssueList from '../components/IssueList.jsx' 

IssueList.propTypes = {
    location: PropTypes.object.isRequired,
    issues: PropTypes.array.isRequired,
    actions: PropTypes.actions.isRequired
};


const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: () => {
    dispatch(addIssue(ownProps.filter))
  }
})

export default connect(mapDispatchToProps)(IssueList);
