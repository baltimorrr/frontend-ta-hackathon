import { useCallback, useEffect, useState } from 'react'

// @mui
import { Box, Card, List, ListItemText, Typography } from '@mui/material'

// components
import BasicTable from 'components/BasicTable'
import { useSnackbar } from 'notistack'
import { _getApi } from '../../utils/axios'
import { TABLE_CERTIFICATIONS_HEAD, TABLE_EDUCATION_HEAD, TABLE_WORK_EXPERIENCE_HEAD } from './config'
import WorkExperienceTableRow from './WorkExperienceTableRow'
import EducationTableRow from './EducationTableRow'
import CertificationsTableRow from './CertificationsTableRow'

export default function DetailResume({ id }) {
  const [resumeDetail, setResumeDetail] = useState(null)
  const { enqueueSnackbar } = useSnackbar()

  const workExperienceColumns = TABLE_WORK_EXPERIENCE_HEAD

  const tableWorkExperienceRowComp = useCallback((row, index) => {
    return <WorkExperienceTableRow key={row?.id || index} row={row} />
  }, [])

  const educationColumns = TABLE_EDUCATION_HEAD

  const tableEducationRowComp = useCallback((row, index) => {
    return <EducationTableRow key={row?.id || index} row={row} />
  }, [])

  const certificationsColumns = TABLE_CERTIFICATIONS_HEAD

  const tableCertificationsRowComp = useCallback((row, index) => {
    return <CertificationsTableRow key={row?.id || index} row={row} />
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
              <Typography variant='h5' ml={2}>
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
        resumeDetail?.cvInJson?.education?.length > 0 && (
          <Card>
            <Box mt={2}>
              <Typography variant='h5' ml={2}>
                Education
              </Typography>

              <BasicTable
                columns={educationColumns}
                page={1}
                rowsPerPage={resumeDetail?.cvInJson?.education?.length}
                dataSource={resumeDetail?.cvInJson?.education}
                TableRowComp={tableEducationRowComp}
                heightEmptyRow={0}
              />
            </Box>
          </Card>
        )
      }

      {
        resumeDetail?.cvInJson?.skills?.length > 0 && (
          <Card pl={2}>
            <Box mt={2}>
              <Typography variant='h5' ml={2}>
                Skills
              </Typography>

              <List>
                {
                  resumeDetail?.cvInJson?.skills?.map((item) => {
                    return (
                      <>
                        <ListItemText
                          ml={2}
                          primary={item}
                        />
                      </>
                    )
                  })
                }
              </List>
            </Box>
          </Card>
        )
      }

      {
        resumeDetail?.cvInJson?.certifications?.length > 0 && (
          <Card>
            <Box mt={2}>
              <Typography variant='h5' ml={2}>
                Certifications
              </Typography>

              <BasicTable
                columns={certificationsColumns}
                page={1}
                rowsPerPage={resumeDetail?.cvInJson?.certifications?.length}
                dataSource={resumeDetail?.cvInJson?.certifications}
                TableRowComp={tableCertificationsRowComp}
                heightEmptyRow={0}
              />
            </Box>
          </Card>
        )
      }
    </>
  )
}
