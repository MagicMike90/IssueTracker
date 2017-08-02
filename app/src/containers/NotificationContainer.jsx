import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNotification } from '../actions/notificationActions';
import Snackbar from '../components/notification/Snackbar.jsx';

class NotificationContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }
   componentWillReceiveProps(newProps) {
    const { message, level } = newProps.notification;
    this.notificationSystem.addNotification({
      message,
      level
    });
  }
  render() {
    return (
      <Snackbar open={this.props.open} message={this.props.message}/>
    );
  }
}

function mapStateToProps(state) {
  const { notification } = state;
  return {
    open: notification.message ? true : false,
    message: notification.message
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
