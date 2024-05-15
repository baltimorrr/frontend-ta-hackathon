import { createContext, useCallback } from 'react'

import PropTypes from 'prop-types'

// config
import { ROLE } from 'config'

// hooks
import useAuth from 'hooks/useAuth'

const RoleContext = createContext()

const RoleProvider = ({ children }) => {
  const { user } = useAuth()
  const currentRole = user?.role // Admin;

  const checkAccessPermission = useCallback(
    (roles = []) => [].concat(roles).includes(currentRole),
    [currentRole]
  )

  const isAdminRole = ROLE.ADMIN === currentRole

  return (
    <RoleContext.Provider
      value={{
        checkAccessPermission,
        isAdminRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  )
}

RoleProvider.propTypes = {
  children: PropTypes.node,
}

export { RoleContext, RoleProvider }
