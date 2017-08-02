import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

const styleSheet = createStyleSheet(theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
}));

class SimpleSnackbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      message: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }
  componentWillReceiveProps(nextProps,) {
    this.setState({ open: nextProps.open, message: nextProps.message });
  }

  handleClick() {
    this.setState({ open: true });
  };

  handleRequestClose() {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.open}
          autoHideDuration={6e3}
          onRequestClose={this.handleRequestClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.message}</span>}

        />
      </div>
    );
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(SimpleSnackbar);
