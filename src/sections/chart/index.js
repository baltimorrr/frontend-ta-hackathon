import { fNumber } from 'utils/formatNumber'
import merge from 'lodash/merge'
import BaseOptionChart from 'components/chart/BaseOptionChart'
import { Box, Card, CardHeader } from '@mui/material'
import ReactApexChart from 'react-apexcharts'


const chartData = [
  { label: 'Italy', value: 400 },
  { label: 'Japan', value: 430 },
  { label: 'China', value: 448 },
  { label: 'Canada', value: 470 },
  { label: 'France', value: 540 },
  { label: 'Germany', value: 580 },
  { label: 'South Korea', value: 690 },
  { label: 'Netherlands', value: 1100 },
  { label: 'United States', value: 1200 },
  { label: 'United Kingdom', value: 1380 },
]

export default function ChartSection({...other}) {
  const chartLabels = chartData.map((i) => i.label)

  const chartSeries = chartData.map((i) => i.value)

  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 },
    },
    xaxis: {
      categories: chartLabels,
    },
  })

  console.log(chartOptions)

  return (
    <Card {...other}>
      <CardHeader title={'title'} subheader={'subheader'}/>

      <Box sx={{ mx: 3 }} dir='ltr'>

<ReactApexChart type="bar" series={[{ data: chartSeries }]} options={chartOptions} height={364} />

      </Box>
    </Card>
  )
}
