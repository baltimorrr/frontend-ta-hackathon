import { Container } from '@mui/material'
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs'
import Page from 'components/Page'
import ChatSection from 'sections/chat'

export default function ChatPage() {
  return (
    <Page
      title='Chat'
      sx={{
        width: '100%',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          height: '100%',
          p: 3,
          overflow: 'hidden',
          '& > form': {
            height: '100%',
          },
          '& > .MuiBox-root': {
            mb: 0,
          },
        }}
      >
        <HeaderBreadcrumbs
          heading='Chat'
          sx={{
            px: 2,
          }}
        />

        <ChatSection />
      </Container>
    </Page>
  )
}
