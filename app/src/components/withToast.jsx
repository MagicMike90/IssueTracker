import React from 'react';
import Toast from './Toast.jsx';

// Higher Order Components (HOC) design pattern
export default function withToast(OriginalComponent) {
  return class WithToast extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        toastVisible: false, toastMessage: '', toastType: 'success',
      };
      this.showSuccess = this.showSuccess.bind(this);
      this.showError = this.showError.bind(this);
      this.dismissToast = this.dismissToast.bind(this);
    }

    showSuccess(message) {
      this.setState({ toastVisible: true, toastMessage: message, toastType: 'success' });
    }

    showError(message) {
      this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
    }

    dismissToast() {
      this.setState({ toastVisible: false });
    }

    render() {
      // const { error } = this.props;
      // if (error) {
      //   console.log('withToast', error);
      //   this.showError(error);
      // }
      return (
        <div>
          <OriginalComponent
            showError={this.showError} showSuccess={this.showSuccess} {...this.props}
          />
          <Toast
            showing={this.state.toastVisible} message={this.state.toastMessage}
            onDismiss={this.dismissToast} bsStyle={this.state.toastType}
          />
        </div>
      );
    }
  };
}
