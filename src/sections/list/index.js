import { useCallback, useEffect, useState } from 'react'

// @mui
import { Box, Card, Grid } from '@mui/material'

// components
import BasicTable from 'components/BasicTable'
import Pagination from 'components/Pagination'

import { DEFAULT_PAGE } from 'config'

import useTable from 'hooks/useTable'

import UserTableRow from './UserTableRow'
import { TABLE_DESKTOP_HEAD, mockData } from './config'
import { useSnackbar } from 'notistack'
import { _getApi } from '../../utils/axios'
import { fDateEndOfMonth, fDateStartOfMonth } from '../../utils/formatTime'
import { AI_MODEL_OPTIONS } from '../chart/config'
import RHFDatePicker from '../../components/form/RHFDatePicker'
import FormProvider from '../../components/form/FormProvider'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'

export default function ListUser() {
  const { page, setPage, rowsPerPage, onChangePage } = useTable({
    defaultRowsPerPage: 6,
  })
  const methods = useForm({
    defaultValues: {
      fromDate: fDateStartOfMonth(new Date()),
      toDate: fDateEndOfMonth(new Date())
    },
  })

  const [listResume, setListResume] = useState([])
  const [totalRecords, setTotalRecords] = useState(0);
  const { enqueueSnackbar } = useSnackbar()

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const columns = TABLE_DESKTOP_HEAD

  const tableRowComp = useCallback((row, index) => {
    return <UserTableRow key={row?.id || index} row={row} />
  }, [])

  const fetchData = useCallback(
    async ({ params }) => {
      try {
        const response = await _getApi('resume', { params })

        const data = response?.data?.map((item) => {
          return {
            ...item,
            cvInJson: {
              ...item?.cvInJson,
              createdAt: item?.createdAt,
              id: item?.id,
              file_key: item?.file_key
            }
          }
        })

        const listResumeData = data?.map((item) => {
          return item?.cvInJson
        })

        setListResume(listResumeData)
        setTotalRecords(response?.totalRecords)
      } catch (error) {
        enqueueSnackbar(error?.message, { variant: 'error' })
      }
    },
    [enqueueSnackbar]
  )

  useEffect(() => {
    setPage(DEFAULT_PAGE)
  }, [setPage])

  useEffect(() => {
    fetchData({
      params: {
        page_index: page,
        page_size: rowsPerPage,
        fromDate: fDateStartOfMonth(new Date())?.toISOString(),
        toDate: fDateEndOfMonth(new Date())?.toISOString()
      }
    })
  }, [fetchData, page])

  const onSubmit = async (data) => {
    const params = {
      page_index: page,
      page_size: rowsPerPage,
      fromDate: data?.fromDate?.toISOString(),
      toDate: data?.toDate?.toISOString(),
    }
    fetchData({ params })
  }

  return (
    <Card>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} fullWidth>
          <Grid item xs={3}>
            <RHFDatePicker label='From Date' name='fromDate' />
          </Grid>

          <Grid item xs={3}>
            <RHFDatePicker label='To Date' name='toDate' />
          </Grid>

          <Grid item xs={2}>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={isSubmitting}
              size='large'
              sx={{ height: '100%', width: '100%' }}
            >
              Search
            </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>

      <Box mt={2}>
        <BasicTable
          columns={columns}
          page={page}
          rowsPerPage={rowsPerPage}
          dataSource={listResume}
          TableRowComp={tableRowComp}
          heightEmptyRow={0}
        />

        <Pagination
          totalRecord={totalRecords}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={onChangePage}
          sx={{
            p: 2,
          }}
        />
      </Box>
    </Card>
  )
}
