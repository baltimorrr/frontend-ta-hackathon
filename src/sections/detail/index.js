import { useCallback, useEffect, useState } from 'react'

// @mui
import { Box, Card, Typography } from '@mui/material'

// components
import BasicTable from 'components/BasicTable'
import { useSnackbar } from 'notistack'
import { _getApi } from '../../utils/axios'
import { TABLE_WORK_EXPERIENCE_HEAD } from './config'
import WorkExperienceTableRow from './WorkExperienceTableRow'
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs'

export default function DetailResume({ id }) {
  const [resumeDetail, setResumeDetail] = useState(null)
  const { enqueueSnackbar } = useSnackbar()

  const workExperienceColumns = TABLE_WORK_EXPERIENCE_HEAD

  const tableWorkExperienceRowComp = useCallback((row, index) => {
    return <WorkExperienceTableRow key={row?.id || index} row={row} />
  }, [])

  const fetchData = useCallback(
    async ({ params }) => {
      try {
        const response = await _getApi('resume/detail', { params })

        console.log('Huy data: ', response)

        setResumeDetail(response)
      } catch (error) {
        enqueueSnackbar(error?.message, { variant: 'error' })
      }
    },
    [enqueueSnackbar],
  )

  useEffect(() => {
    fetchData({
      params: {
        id: parseInt(id),
      },
    })
  }, [fetchData, id])

  return (
    <>
      {
        resumeDetail?.cvInJson?.title && (
          <p>
            <b>Title: </b> {resumeDetail?.cvInJson?.title}
          </p>
        )
      }

      {
        resumeDetail?.cvInJson?.name && (
          <p>
            <b>Name: </b> {resumeDetail?.cvInJson?.name}
          </p>
        )
      }

      {
        resumeDetail?.cvInJson?.email && (
          <p>
            <b>Email: </b> {resumeDetail?.cvInJson?.email}
          </p>
        )
      }

      {
        resumeDetail?.cvInJson?.phone && (
          <p>
            <b>Phone: </b> {resumeDetail?.cvInJson?.phone}
          </p>
        )
      }

      {
        resumeDetail?.cvInJson?.address && (
          <p>
            <b>Address: </b> {resumeDetail?.cvInJson?.address}
          </p>
        )
      }

      {
        resumeDetail?.cvInJson?.work_experience?.length > 0 && (
          <Card>
            <Box mt={2}>
              <Typography variant='h5'>
                Work Experience
              </Typography>

              <BasicTable
                columns={workExperienceColumns}
                page={1}
                rowsPerPage={resumeDetail?.cvInJson?.work_experience?.length}
                dataSource={resumeDetail?.cvInJson?.work_experience}
                TableRowComp={tableWorkExperienceRowComp}
                heightEmptyRow={0}
              />
            </Box>
          </Card>
        )
      }

      {
        resumeDetail?.cvInJson?.work_experience?.length > 0 && (
          <Card>
            <Box mt={2}>
              <Typography variant='h5'>
                Work Experience
              </Typography>

              <BasicTable
                columns={workExperienceColumns}
                page={1}
                rowsPerPage={resumeDetail?.cvInJson?.work_experience?.length}
                dataSource={resumeDetail?.cvInJson?.work_experience}
                TableRowComp={tableWorkExperienceRowComp}
                heightEmptyRow={0}
              />
            </Box>
          </Card>
        )
      }

      {
        resumeDetail?.cvInJson?.work_experience?.length > 0 && (
          <Card>
            <Box mt={2}>
              <Typography variant='h5'>
                Work Experience
              </Typography>

              <BasicTable
                columns={workExperienceColumns}
                page={1}
                rowsPerPage={resumeDetail?.cvInJson?.work_experience?.length}
                dataSource={resumeDetail?.cvInJson?.work_experience}
                TableRowComp={tableWorkExperienceRowComp}
                heightEmptyRow={0}
              />
            </Box>
          </Card>
        )
      }
    </>
  )
}
