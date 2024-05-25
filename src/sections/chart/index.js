import merge from 'lodash/merge'
import BaseOptionChart from 'components/chart/BaseOptionChart'
import { Box, Card, CardHeader } from '@mui/material'
import ReactApexChart from 'react-apexcharts'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { _getApi } from 'utils/axios'
import ChatToolbar from './ChartToolbar'
import FormProvider from 'components/form/FormProvider'
import { useForm } from 'react-hook-form'
import { fDateEndOfMonth, fDateStartOfMonth } from 'utils/formatTime'
import { AI_MODEL_OPTIONS } from './config'
import { useSnackbar } from 'notistack'
import Loading from 'components/Loading'
export default function ChartSection({ ...other }) {
  const [aiReportData, setAIReportData] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  const [isLoadingData, setIsLoadingData] = useState(false)
  const methods = useForm({
    defaultValues: {
      fromDate: fDateStartOfMonth(new Date()),
      toDate: fDateEndOfMonth(new Date()),
      model: AI_MODEL_OPTIONS[0],
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const fetchData = useCallback(
    async ({ params }) => {
      try {
        setIsLoadingData(true)
        const response = await _getApi('ai-report', { params })
        setAIReportData(response)
        setIsLoadingData(false)
      } catch (error) {
        setIsLoadingData(true)
        enqueueSnackbar(error?.message, { variant: 'error' })
      }
    },
    [enqueueSnackbar]
  )

  const chartData = useMemo(() => {
    return {
      series: [
        {
          name: 'Total cost',
          data: aiReportData?.map((it) => it?.totalCost),
        },
      ],
    }
  }, [aiReportData])

  const chartOptions = useMemo(() => {
    return merge(BaseOptionChart(), {
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
            return val
          },
        },
      },
      tooltip: {
        enabled: true,
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const {
            totalCompletionTokens,
            totalCost,
            totalPromptTokens,
            totalTokens,
            date,
          } = {
            ...aiReportData?.[dataPointIndex],
          }
          console.log(
            'series',
            series,
            seriesIndex,
            aiReportData?.[dataPointIndex]
          )
          return `
          <div style="padding: 8px;">
          <div>
          <span style="font-weight: bold;"> ${date}</span>
          </div>

          <div>
          <span> Total completion tokens: </span>
          <span style="font-weight: bold;"> ${totalCompletionTokens}</span>
          </div>
  
          <div>
          <span> Total cost: </span>
          <span style="font-weight: bold;">${Number(totalCost).toFixed(
            5
          )} $</span>
          </div>
  
          <div>
          <span> Total prompt tokens: </span>
          <span style="font-weight: bold;"> ${totalPromptTokens}</span>
          </div>
  
          <div>
          <span> Total tokens: </span>
          <span style="font-weight: bold;"> ${totalTokens}</span>
          </div>
          </div>
          `
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
  }, [aiReportData])

  const onSubmit = async (data) => {
    const params = {
      ...data,
      fromDate: data?.fromDate?.toISOString(),
      toDate: data?.toDate?.toISOString(),
    }
    fetchData({ params })
  }

  useEffect(() => {
    fetchData({
      params: {
        fromDate: fDateStartOfMonth(new Date())?.toISOString(),
        toDate: fDateEndOfMonth(new Date())?.toISOString(),
        model: AI_MODEL_OPTIONS[0],
      },
    })
  }, [fetchData])

  return (
    <Card {...other}>
      <CardHeader title={'title'} subheader={'subheader'} />

      <Box sx={{ mx: 3 }} dir='ltr'>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <ChatToolbar isSubmitting={isSubmitting} />
        </FormProvider>

        {isLoadingData ? (
          <Loading sx={{ height: 350, width: '100%' }} />
        ) : (
          <ReactApexChart
            type='bar'
            series={chartData?.series}
            options={chartOptions}
            height={364}
          />
        )}
      </Box>
    </Card>
  )
}
