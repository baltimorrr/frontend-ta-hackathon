import { Button, Container, Stack } from '@mui/material'
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs'
import Page from 'components/Page'
import { useState } from 'react'
import ListUser from 'sections/list'
import UploadResumeModal from 'sections/list/UploadResumeModal'

export default function ListPage() {
  const [isOpenModalUpload, setIsOpenModalUpload] = useState(false)
  return (
    <>
      <Page title='List' sx={{ width: '100%', overflow: 'auto' }}>
        <Container>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            fullWidth
          >
            <HeaderBreadcrumbs
              heading='List'
              sx={{
                px: 2,
                mb: 3,
              }}
            />

            <Button
              variant='contained'
              onClick={() => setIsOpenModalUpload(true)}
            >
              Upload resume
            </Button>
          </Stack>

          <ListUser />
        </Container>
      </Page>

      {isOpenModalUpload ? (
        <UploadResumeModal open onClose={() => setIsOpenModalUpload(false)} />
      ) : null}
    </>
  )
}
