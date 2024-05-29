import { useState } from 'react'

import { Box, Button, IconButton, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { NAVBAR } from 'config'

import NavList from './NavList'
import useAuth from 'hooks/useAuth'

export default function NavSectionVertical({ navConfig = [] }) {
  const theme = useTheme()
  const [isCollapse, setIsCollapse] = useState(false)
  const { logout } = useAuth()

  return (
    <Stack
      direction='column'
      justifyContent='space-between'
      sx={{
        width: isCollapse ? 'auto' : NAVBAR.DASHBOARD_WIDTH,
        borderRight: `1px dashed ${theme.palette.grey[400]}`,
        position: 'relative',
      }}
      spacing={0.5}
    >
      {navConfig.map((item, index) => (
        <Box
          sx={{
            width: 1,
            px: 2,
            ...(!isCollapse && {
              py: 2,
            }),
          }}
          key={item?.subheader + index}
        >
          <NavList list={item?.items} isCollapse={isCollapse} />
        </Box>
      ))}

      <Stack>
        <IconButton
          onClick={() => setIsCollapse(!isCollapse)}
          sx={{
            position: 'absolute',
            top: 45,
            right: 0,
            border: `1px dashed ${theme.palette.grey[300]}`,
            padding: theme.spacing(0.25),
            transform: 'translateX(50%)',
            backgroundColor: theme.palette.common.white,
            '&:hover': {
              backgroundColor: theme.palette.grey[200],
            },
          }}
        >
          <Box
            sx={{
              lineHeight: 0,
              color: theme.palette.grey[500],
              transition: (theme) =>
                theme.transitions.create('transform', {
                  duration: theme.transitions.duration.shorter,
                }),
              ...(isCollapse && {
                transform: 'rotate(180deg)',
              }),
              '& > svg': {
                width: 22,
                height: 22,
              },
            }}
          >
            {ArrowIcon}
          </Box>
        </IconButton>
      </Stack>

      <Button
        variant='outlined'
        sx={{ margin: '16px !important' }}
        onClick={logout}
      >
        Log out
      </Button>
    </Stack>
  )
}

const ArrowIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    viewBox='0 0 24 24'
  >
    <path
      fill='none'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      d='m14 7l-5 5l5 5'
    />
  </svg>
)
