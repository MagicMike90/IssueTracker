import React from 'react';
import PropTypes from 'prop-types'
import { Panel, Table } from 'react-bootstrap';
import qs from 'query-string';
import Grid from 'material-ui/Grid';

import StatCard from './dashboard/StatCard.jsx'
import ReportDataTable from './ReportDataTable.jsx'
import EventTraker from './event-tracker/EventTraker.jsx'
import LineChart from './charts/LineChart.jsx'


class IssueReport extends React.Component {
  static dataFetcher({ urlBase, location }) {
    const search = location.query ? `${location.query}&_summary` : '?_summary';
    return fetch(`${urlBase || ''}/api/issues${search}`).then(response => {
      if (!response.ok) return response.json().then(error => Promise.reject(error));
      return response.json().then(data => ({ IssueReport: data }));
    });
  }
  constructor(props, context) {
    super(props, context);

    // const stats = context.initialState.IssueReport ? context.initialState.IssueReport : {};
    this.state = {
      stats: {}
    };
    this.setFilter = this.setFilter.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate(prevProps) {
    const oldQuery = qs.parse(prevProps.location.search);
    const newQuery = qs.parse(this.props.location.search);

    if (newQuery === undefined) return;

    if (oldQuery.status === newQuery.status
      && oldQuery.effort_gte === newQuery.effort_gte
      && oldQuery.effort_lte === newQuery.effort_lte) {
      return;
    }
    this.loadData();
  }
  setFilter(query) {
    let qs = qs.stringify(query);
    this.props.history.push({ pathname: this.props.location.pathname, search: qs })
  }

  loadData() {
    IssueReport.dataFetcher({ location: this.props.location })
      .then(data => {
        this.setState({ stats: data.IssueReport });
      }).catch(err => {
        this.props.showError(`Error in fetching data from server: ${err}`);
      });
  }
  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={7}>
            <LineChart />
          </Grid>

          <Grid item xs={5}>
            <EventTraker />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={7}>
            <ReportDataTable stats={this.state.stats} />
          </Grid>
        </Grid >

        <Grid container>
          <Grid item md={3}>
            <StatCard title="Total Issues" />
          </Grid >
          <Grid item md={3}>
            <StatCard title="Total Fixed" type="success" />
          </Grid >
          <Grid item md={3}>
            <StatCard title="Total Assigned" type="warning" />
          </Grid >
          <Grid item md={3}>
            <StatCard title="Total Verified" type="error" />
          </Grid >
        </Grid>

      </div >
    );
  }
}
IssueReport.propTypes = {
  location: PropTypes.object.isRequired,
  router: PropTypes.object,
};

export default IssueReport;
