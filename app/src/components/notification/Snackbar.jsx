import React, { Component } from 'react';
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
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
          transition={<Slide direction={this.state.direction} />}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.message}</span>}
        />
      </div>
    );
  }
}

export default DirectionSnackbar;
