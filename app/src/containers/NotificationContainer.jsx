import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNotification } from '../actions/notificationActions';
import Snackbar from '../components/notification/Snackbar.jsx';

class NotificationContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const open = this.props.notification.message ? true : false;
    const message = this.props.notification.message ? this.props.notification.message : "";
    
    return (
      <Snackbar open={open} message={message} />
    );
  }
}

function mapStateToProps(state) {
  return {
    notification: state.notification
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addNotification
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationContainer);
