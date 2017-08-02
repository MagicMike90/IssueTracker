import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';


class DirectionSnackbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      direction: "up",
    };

    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleRequestClose () {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Snackbar
          open={this.props.open}
          onRequestClose={this.handleRequestClose}
          transition={<Slide direction="up" />}
          autoHideDuration={1000}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.message}</span>}
        />
      </div>
    );
  }
}

export default connect()(DirectionSnackbar);
