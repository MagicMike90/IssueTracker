import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { addIssue } from '../actions'

import IssueAddNavItem from '../components/IssueAddNavItem.jsx'

IssueAddNavItem.propTypes = {
  router: PropTypes.object,
  showError: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};


const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: () => {
    dispatch(addIssue(ownProps.issues))
  }
})

const IssueAddContainer = connect(
  null,
  mapDispatchToProps
)(IssueAddNavItem)
export default IssueAddContainer;
