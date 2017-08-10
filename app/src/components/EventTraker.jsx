import React, { Component } from 'react';
import { Timeline, TimelineEvent, TimelineBlip } from 'react-event-timeline'
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';


const styleSheet = createStyleSheet(theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  card: {
    fontSize: 14
  },
  cardHeader: {
    padding: theme.spacing.unit * 2
  }
}));
class EventTraker extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const classes = this.props.classes;
    return (
      <div>
        {/* <Paper className={classes.root} elevation={4}> */}
        <Card className={classes.card}>

          <Typography type="title" className={classes.cardHeader}>Recent events</Typography>
          <CardContent>
            <Timeline>
              <TimelineEvent
                title="Introduction to Redux in React applications"
                createdAt="2016-09-12 10:06 PM"
                iconColor="#757575"
                container="card"
                cardHeaderStyle={{ backgroundColor: "#8bc34a", color: "#503331" }}
              >
                Card as timeline event with custom container and header styling
</TimelineEvent>
              <TimelineEvent
                title="Introduction to Redux in React applications"
                createdAt="2016-09-12 10:06 PM"
                iconColor="#757575"
                container="card"
              >
                A simple card with sensible defaults for styling
</TimelineEvent>
            </Timeline >
          </CardContent>
        </Card>
        {/* </Paper> */}
      </div>
    );
  }
}
EventTraker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(EventTraker);
