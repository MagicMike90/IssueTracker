import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Divider from 'material-ui/Divider';
import { withStyles, createStyleSheet } from 'material-ui/styles';


const styleSheet = createStyleSheet(theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  FormGroup: {
    margin: theme.spacing.unit,
  },
  input: {
    margin: theme.spacing.unit,
  }
}));

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => {
  let errMsg = "";
  if (error) errMsg = touched && error;

  return (
    <TextField
      label={label}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  )
}


let EditIssueForm = props => {
  const { handleSubmit, issue } = props;
  const classes = props.classes;

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup className={classes.FormGroup} row={true}>
        <Field name="title" label="Title" component={renderTextField} className={classes.textField} fullWidth={true} type="text" />
      </FormGroup>
      <FormGroup className={classes.FormGroup} row={true}>
        <Field name="owner" label="Owner" component={renderTextField} className={classes.textField} fullWidth={true} type="text" />
      </FormGroup>
      <FormGroup className={classes.FormGroup} row={true}>
        <Button type="submit" className={classes.button} color="primary" raised>Create</Button>
      </FormGroup>
    </form>
  )
}
const componentWithStyles = withStyles(styleSheet)(EditIssueForm);
EditIssueForm = reduxForm({
  // a unique name for the form
  form: 'editIssueForm'
})(componentWithStyles)

export default EditIssueForm;
