import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createIssue } from '../actions/issueActions'
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



import AddIssueForm from './forms/AddIssueForm.jsx';

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
  dialog: {
    width: "100%"
  }
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

  submit(values) {
    // e.preventDefault();
    console.log(values)

    this.hideModal();

    const newIssue = {
      owner: values.title,
      title: values.owner,
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
        <Dialog open={this.state.open} classes={{ paper: classes.dialog }} onRequestClose={this.handleRequestClose}>
          <DialogTitle>
            {"Create Issue"}
          </DialogTitle>
          <DialogContent>
            <AddIssueForm handleCancel={this.hideModal} onSubmit={this.submit} />
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
  const issuesState = state.issuesState;
  return {
    updatedIssue: issuesState.updatedIssue,
    error: issuesState.error,
  }
};

const componentWithStyles = withStyles(styleSheet)(IssueAddNavItem);
export default withRouter(connect(mapStateToProps)(componentWithStyles));
