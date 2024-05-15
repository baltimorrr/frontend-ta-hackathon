import { BrowserRouter } from 'react-router-dom'
import Router from 'routes'
import ThemeProvider from 'theme'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
