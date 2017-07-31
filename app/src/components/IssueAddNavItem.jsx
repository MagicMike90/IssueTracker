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

const styleSheet = createStyleSheet(theme => ({
  button: {
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
    this.setState({ showing: true });
  }
  hideModal() {
    this.setState({ showing: false });
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

  // render() {
  //   return (
  //     <NavItem onClick={this.showModal}><Glyphicon glyph="plus" /> Create Issue<Modal keyboard show={this.state.showing} onHide={this.hideModal}>
  //       <Modal.Header closeButton>
  //         <Modal.Title>Create Issue</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <Form name="issueAdd">
  //           <FormGroup>
  //             <ControlLabel>Title</ControlLabel>
  //             <FormControl name="title" autoFocus />
  //           </FormGroup>
  //           <FormGroup>
  //             <ControlLabel>Owner</ControlLabel>
  //             <FormControl name="owner" />
  //           </FormGroup>
  //         </Form>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <ButtonToolbar>
  //           <Button type="button" bsStyle="primary" onClick={this.submit}>Submit</Button>
  //           <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
  //         </ButtonToolbar>
  //       </Modal.Footer>
  //     </Modal>
  //     </NavItem>
  //   );
  // }
  render() {
    const classes = this.props.classes;
    return (
      // <Button fab color="accent" className={classes.button}>
      //   <ModeEditIcon />
      // </Button>
      <Button color="contrast" onClick={this.showModal}>Create Issue</Button>
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
