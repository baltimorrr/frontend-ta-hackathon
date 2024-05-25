import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import { BrowserRouter } from 'react-router-dom'
import Router from 'routes'
import ThemeProvider from 'theme'

function App() {
  return (
    <div className='app'>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  )
}

export default App
