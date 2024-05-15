import PropTypes from 'prop-types'

// hooks
import useRole from 'hooks/useRole'

RoleBasedGuard.propTypes = {
  hasContent: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.string), // Example ['Director', 'Leader', 'Memeber']
  children: PropTypes.node.isRequired,
}

export default function RoleBasedGuard({
  hasContent = false,
  roles = [],
  children,
}) {
  const { checkAccessPermission } = useRole()
  const hasRole = checkAccessPermission(roles)

  if (!hasRole) {
    return hasContent ? <div>forbidden</div> : null
  }

  return <>{children}</>
}
