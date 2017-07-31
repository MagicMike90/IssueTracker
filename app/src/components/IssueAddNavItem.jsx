import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createIssue } from '../actions/issueActions'

import { withRouter } from 'react-router-dom';
// import {
//   NavItem, Glyphicon, Modal, Form, FormGroup, FormControl,
//   ControlLabel, Button, ButtonToolbar
// } from 'react-bootstrap';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FormControl from 'material-ui/Form/FormControl';

const styleSheet = createStyleSheet(theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
  },
}));


class IssueAddNavItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showing: false,

    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.submit = this.submit.bind(this);
  }
  showModal() {
    this.setState({ open: true });
  }
  hideModal() {
    this.setState({ open: false });
  }

  submit(e) {
    e.preventDefault();
    this.hideModal();
    const form = document.forms.issueAdd;
    const newIssue = {
      owner: form.owner.value,
      title: form.title.value,
      status: 'New',
      created: new Date(),
    };

    this.props.dispatch(createIssue(newIssue, this.props.history));
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <Button color="contrast" onClick={this.showModal}>Create Issue</Button>
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>
            {"Create Issue"}
          </DialogTitle>
          <DialogContent>

            <form name="issueAdd">
              <FormControl className={classes.formControl}>
                <TextField
                  id="title"
                  name="title"
                  label="Title"
                  className={classes.textField}
                  fullWidth={true}
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextField
                  id="owner"
                  name="owner"
                  label="Owner"
                  className={classes.textField}
                  fullWidth={true}
                />
              </FormControl>

              <DialogActions>
                <Button onClick={this.hideModal} color="primary">Cancel</Button>
                <Button type='submit' onClick={this.submit} color="primary">Submit</Button>
              </DialogActions>
            </form>

          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
IssueAddNavItem.propTypes = {
  updatedIssue: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const issuesReducer = state.issuesReducer;
  return {
    updatedIssue: issuesReducer.updatedIssue,
    error: issuesReducer.error,
  }
};

const componentWithStyles = withStyles(styleSheet)(IssueAddNavItem);
export default withRouter(connect(mapStateToProps)(componentWithStyles));
