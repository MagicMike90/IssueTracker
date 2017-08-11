import React from 'react';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import PaperStyle from '../theme/Paper'
import Typography from 'material-ui/Typography'


// Higher Order Components (HOC) design pattern
export default function PaperWrapper(OriginalComponent, cardTitle) {
  class WithPaper extends React.Component {
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
      const classes = this.props.classes;
      return (
        <div >
          <Paper className={classes.root}>
            <div className={classes.title}>
              <Typography type="subheading">{cardTitle? cardTitle: "Card Title"}</Typography>
            </div>
            <OriginalComponent {...this.props}/>
          </Paper>
        </div>
      );
    }
  };
  return withStyles(PaperStyle)(WithPaper);

}
