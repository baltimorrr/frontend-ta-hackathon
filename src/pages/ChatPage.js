import { Container } from '@mui/material'
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs'
import Page from 'components/Page'

export default function ChatPage() {
  return (
    <Page title='Chat' sx={{ width: '100%' }}>
      <Container>
        <HeaderBreadcrumbs
          heading='Chat'
          sx={{
            px: 2,
          }}
        />
      </Container>
    </Page>
  )
}
