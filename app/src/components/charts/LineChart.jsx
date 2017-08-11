import React from 'react';
import PropTypes from 'prop-types'
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

import classNames from 'classnames';
// import { withStyles } from 'material-ui/styles';
// import Paper from 'material-ui/Paper';
// import PaperStyle from '../../theme/Paper'
import Typography from 'material-ui/Typography';
import PaperWrapper from '../PaperWrapper.jsx'

class LineChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, title, type } = this.props;
    var data = {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }


    return (
      <div>
        <Line data={data} />
      </div>
    );
  }
};

LineChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  chartId: PropTypes.string
}

export default PaperWrapper(LineChart, "Issues");
