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
    paddingBottom: theme.spacing.unit * 2,
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

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    label={label}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

// const formatDate = (date, name) => {

//   if (date == 'Invalid Date') {
//     console.log('return');
//     return date;
//   }
//   var d = new Date(date),
//     month = '' + (d.getMonth() + 1),
//     day = '' + d.getDate(),
//     year = d.getFullYear();


//   if (month.length < 2) month = '0' + month;
//   if (day.length < 2) day = '0' + day;

//   return [year, month, day].join('-');
// }
// const parseDate = (date, name) => {
//   console.log('date', date);
//   return new Date(date);
// }

let EditIssueForm = props => {
  const { handleSubmit, issue, initialValues } = props;
  const classes = props.classes;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={classes.formTitle}>
          <Typography type="title" color="secondary" className={classes.title} gutterBottom={true}>
            ID: {issue._id}
          </Typography>

          <Typography type="title" color="secondary" className={classes.title} gutterBottom={true}>
            Created At: {issue.created ? issue.created.toDateString() : ''}
          </Typography>
        </div>
        <FormGroup className={classes.FormGroup} row={true}>
          <Field name="title" label="Title" component={renderTextField} className={classes.textField} fullWidth={true} />
        </FormGroup>

        <FormGroup className={classes.FormGroup} row={true}>
          <Field name="owner" label="Owner" component={renderTextField} className={classes.textField} fullWidth={true} />
        </FormGroup>

        <Grid container gutter={24}>
          <Grid item xs={6}>
            <FormGroup className={classes.FormGroup} row={true}>
              <Field name="effort" label="Effort" component={renderTextField} className={classes.textField} fullWidth={true} />
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup className={classes.FormGroup} row={true}>
              <Field type="date" name="completionDate" label="Completion Date" component={renderTextField} className={classes.textField} fullWidth={true} InputLabelProps={{
                shrink: true,
              }} />
            </FormGroup>
          </Grid>
        </Grid>

        <FormGroup className={classes.FormGroup} row={true}>
          <label className={classes.textField}>Status</label>
          <div className={classes.textField}>
            <Field name="status" component="select">
              <option value="New">New</option>
              <option value="Open">Open</option>
              <option value="Assigned">Assigned</option>
              <option value="Fixed">Fixed</option>
              <option value="Verified">Verified</option>
              <option value="Closed">Closed</option>
            </Field>
          </div>
        </FormGroup>
        <FormGroup className={classes.FormGroup} row={true}>
          <Button type="submit" className={classes.button} color="primary" raised>Create</Button>
        </FormGroup>
      </form>
    </div>
  )
}

const componentWithStyles = withStyles(styleSheet)(EditIssueForm);
EditIssueForm = reduxForm({
  // a unique name for the form
  form: 'editIssueForm',
  enableReinitialize: true
})(componentWithStyles)

export default EditIssueForm;
