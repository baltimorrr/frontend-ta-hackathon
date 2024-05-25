import { Container } from '@mui/material'
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs'
import Page from 'components/Page'
import ListUser from 'sections/list'
import { useParams } from 'react-router-dom'
import DetailResume from '../sections/detail'

export default function DetailPage() {
  const { id } = useParams()

  return (
    <Page
      title='Detail Resume'
      sx={{ width: '100%', overflowY: 'auto', pb: 3 }}
    >
      <Container>
        <HeaderBreadcrumbs
          heading='Detail Resume'
          sx={{
            px: 2,
          }}
        />

        <DetailResume id={id} />
      </Container>
    </Page>
  )
}
