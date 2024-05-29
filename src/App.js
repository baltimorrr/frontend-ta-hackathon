import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import { BrowserRouter } from 'react-router-dom'
import Router from 'routes'
import ThemeProvider from 'theme'
import { SnackbarProvider } from 'notistack'

function App() {
  return (
    <div className='app'>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <ThemeProvider>
            <SnackbarProvider>
              <Router />
            </SnackbarProvider>
          </ThemeProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  )
}

export default App
