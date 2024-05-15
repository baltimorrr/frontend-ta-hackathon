import { Box } from '@mui/material'
import { Icon } from '@iconify/react'

export default function Iconify({ icon, sx, ...other }) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />
}
