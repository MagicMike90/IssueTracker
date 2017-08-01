import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Divider from 'material-ui/Divider';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

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
  },
  formTitle: {
    margin: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
    maxWidth: 400,
  },
  title: {
    flex: 1,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16
  }),
}));

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => {
  let errMsg = "";
  if (error) errMsg = touched && error;

   console.log( custom);
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

  console.log('issue',issue);
  return (
    <Paper className={classes.root} elevation={4}>
      <div className={classes.formTitle}>
        <Typography type="title" color="secondary" className={classes.title} gutterBottom={true}>
          ID: {issue._id}
        </Typography>

        <Typography type="title" color="secondary" className={classes.title} gutterBottom={true}>
          Created At: {issue.created ? issue.created.toDateString() : ''}
        </Typography>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <FormGroup className={classes.FormGroup} row={true}>
            <Field name="owner" label="Owner" component={renderTextField} defaultValue={issue.owner} className={classes.textField} fullWidth={true} />
          </FormGroup>
          <FormGroup className={classes.FormGroup} row={true}>
            <Field name="effort" label="Effort" component={renderTextField} defaultValue={issue.effort} className={classes.textField} fullWidth={true}  />
          </FormGroup>

          <FormGroup className={classes.FormGroup} row={true}>
            <Button type="submit" className={classes.button} color="primary" raised>Create</Button>
          </FormGroup>
        </form>
      </div>
    </Paper>
  )
}
const componentWithStyles = withStyles(styleSheet)(EditIssueForm);
EditIssueForm = reduxForm({
  // a unique name for the form
  form: 'editIssueForm'
})(componentWithStyles)

export default EditIssueForm;
