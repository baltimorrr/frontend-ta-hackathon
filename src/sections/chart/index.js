import merge from 'lodash/merge'
import BaseOptionChart from 'components/chart/BaseOptionChart'
import { Box, Card, CardHeader } from '@mui/material'
import ReactApexChart from 'react-apexcharts'
import { useEffect, useState } from 'react'
import { _getApi } from 'utils/axios'
import ChatToolbar from './ChartToolbar'

export default function ChartSection({ ...other }) {
  const [aiReportData, setAIReportData] = useState([])
  const chartDataFake = {
    series: [
      {
        name: 'Inflation',
        data: aiReportData?.map((it) => it?.totalCost),
      },
    ],
  }

  const chartOptions = merge(BaseOptionChart(), {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Number(val).toFixed(5)
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    xaxis: {
      categories: aiReportData?.map((it) => it?.date),
      position: 'top',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + '%'
        },
      },
    },
    title: {
      text: 'Total cost',
      floating: true,
      offsetY: 345,
      align: 'center',
      style: {
        color: '#444',
      },
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await _getApi('ai-report')
        setAIReportData(response)
        console.log('res', response)
      } catch (error) {}
    }

    fetchData()
  }, [])

  return (
    <Card {...other}>
      <CardHeader title={'title'} subheader={'subheader'} />

      <Box sx={{ mx: 3 }} dir='ltr'>
        {/* <ChatToolbar /> */}
        <ReactApexChart
          type='bar'
          series={chartDataFake?.series}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  )
}
