import React from 'react';
import PropTypes from 'prop-types'

import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import PaperStyle from '../../theme/Paper'
import Typography from 'material-ui/Typography';


class StatCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {classes ,title, type} = this.props;
    let border = classes.normal;
    switch(type) {
      case 'success': border = classes.success; break;
      case 'warning': border = classes.warning; break;
      case 'error': border = classes.error; break;
    }

    return (
      <Paper className={classNames(classes.paper, border)} elevation={4}>
        <div className={classes.title}>
          <Typography type="title">{title}</Typography>
        </div>
        <div className={classes.title}>
          <Typography type="subheading" color="secondary">{"12"}</Typography>
        </div>
      </Paper>
    );
  }
}


export default withStyles(PaperStyle)(StatCard);


