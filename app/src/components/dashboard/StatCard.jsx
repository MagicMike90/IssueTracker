import React from 'react';
import PropTypes from 'prop-types'

import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import PaperStyle from '../../theme/Paper'
import Typography from 'material-ui/Typography';
import ContentPasteIcon from 'material-ui-icons/ContentPaste';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';

class StatCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes, title, type } = this.props;
    let border = classes.normal;
    switch (type) {
      case 'success': border = classes.success; break;
      case 'warning': border = classes.warning; break;
      case 'error': border = classes.error; break;
    }

    return (
        <Paper className={classNames(classes.paper, border)}>
          <ListItem>
            <ListItemText primary={title} secondary="12"/>
            <ListItemSecondaryAction>
              <IconButton disabled>
                <ContentPasteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>

    );
  }
}


export default withStyles(PaperStyle)(StatCard);


