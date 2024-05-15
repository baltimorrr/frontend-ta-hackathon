import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import PropTypes from 'prop-types'

// components
// import LoadingScreen from 'components/LoadingScreen'

// hooks
import useAuth from 'hooks/useAuth'
import LoginPage from 'pages/LoginPage'

// pages
// const Login = loadable(() => import('pages/auth/Login'))

AuthGuard.propTypes = {
  children: PropTypes.node,
}

export default function AuthGuard({ children }) {
    const { isAuthenticated} = useAuth()
  // const isAuthenticated = false

  const { pathname } = useLocation()

  const [requestedLocation, setRequestedLocation] = useState(null)

  //   if (!isInitialized) {
  //     return <LoadingScreen />
  //   }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname)
    }
    return <LoginPage />
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null)
    return <Navigate to={requestedLocation} />
  }

  return <>{children}</>
}
