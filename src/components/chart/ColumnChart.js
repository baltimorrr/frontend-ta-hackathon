import ReactApexChart from 'react-apexcharts'

import merge from 'lodash/merge'
import PropTypes from 'prop-types'

// components
import BaseOptionChart from 'components/chart/BaseOptionChart'

ColumnChart.propTypes = {
  chartData: PropTypes.array,
  chartLabels: PropTypes.array,
}

export default function ColumnChart({ chartData, chartLabels, ...other }) {
  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: chartLabels,
    },
    chart: {
      type: 'bar',
      stacked: true,
    },
    ...other,
  })

  return (
    <ReactApexChart
      type='bar'
      series={chartData}
      options={chartOptions}
      height='100%'
    />
  )
}
