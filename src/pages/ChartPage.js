import { Container } from '@mui/material'
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs'
import Page from 'components/Page'
import ChartSection from 'sections/chart'

export default function ChartPage() {
    return (
        <Page title='Chart' sx={{width: '100%'}}>
          <Container>
            <HeaderBreadcrumbs
              heading='Chart'
              sx={{
                px: 2,
              }}
            />
    
    <ChartSection />
          </Container>
        </Page>
      )
}
