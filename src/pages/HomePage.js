import { Navigate } from 'react-router-dom'
import { PATH_DASHBOARD } from 'routes/path'

export function HomePage() {
  return <Navigate to={PATH_DASHBOARD.general.chat} />
}
