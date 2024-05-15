import React from 'react'
import { Drawer as MuiDrawer } from '@mui/material'
import { DRAWER_WIDTH } from 'config'

function Drawer({ children, PaperProps, ...other }) {
  return (
    <MuiDrawer
      anchor='right'
      PaperProps={{
        sx: { width: DRAWER_WIDTH },
        ...PaperProps,
      }}
      {...other}
    >
      {children}
    </MuiDrawer>
  )
}

export default Drawer
