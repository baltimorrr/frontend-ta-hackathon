import { Container } from '@mui/material'
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs'
import Page from 'components/Page'
import ListUser from 'sections/list'

export default function ListPage() {
  return (
    <Page title='List' sx={{ width: '100%', overflow: 'auto' }}>
      <Container>
        <HeaderBreadcrumbs
          heading='List'
          sx={{
            px: 2,
            mb: 3,
          }}
        />

        <ListUser />
      </Container>
    </Page>
  )
}
