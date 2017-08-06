import React from 'react';
import PropTypes from 'prop-types'
import { Panel, Table } from 'react-bootstrap';
import qs from 'query-string';

import IssueFilter from './IssueFilter.jsx';
import withToast from './withToast.jsx';
import ReportDataTable from './table-report/ReportDataTable.jsx'


const statuses = ['New', 'Open', 'Assigned', 'Fixed', 'Verified', 'Closed'];
const StatRow = (props) => (
  <tr>
    <td>{props.owner}</td>
    {statuses.map((status, index) => (<td key={index}>{props.counts[status]}</td>))}
  </tr>
);
StatRow.propTypes = {
  owner: PropTypes.string.isRequired,
  counts: PropTypes.object.isRequired,
};

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
         <ReportDataTable stats={this.state.stats}/> 
      </div>
    );
  }
}
IssueReport.propTypes = {
  location: PropTypes.object.isRequired,
  router: PropTypes.object,
  showError: PropTypes.func.isRequired
};
const IssueReportWithToast = withToast(IssueReport);
IssueReportWithToast.dataFetcher = IssueReport.dataFetcher;
export default IssueReportWithToast;
