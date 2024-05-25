import { Stack } from '@mui/material'
import NavbarVertical from 'layouts/dashboard/navbar/NavbarVertical'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <Stack
      direction='row'
      sx={{ height: '100vh', maxHeight: '100vh', overflow: 'hidden' }}
    >
      <NavbarVertical />

      <Outlet />
    </Stack>
  )
}
