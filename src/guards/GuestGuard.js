import { Navigate } from 'react-router-dom'

import PropTypes from 'prop-types'

// hooks
import useAuth from 'hooks/useAuth'

// routes

GuestGuard.propTypes = {
  children: PropTypes.node,
}

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={'/'} />
  }

  return <>{children}</>
}
