import { useMemo } from 'react'
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom'

import { Box, Stack, Typography } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'

import Iconify from 'components/Iconify'

import { ListItemIconStyle } from './style'

function getActive(path, pathname) {
  return path ? !!matchPath({ path, end: false }, pathname) : false
}

export function NavItemRoot({
  item = {},
  open = false,
  isCollapse = false,
  onToggle,
}) {
  const theme = useTheme()

  const { title = '', icon = {}, path = '', children } = item || {}

  const { pathname } = useLocation()
  const active = getActive(path, pathname)

  const renderContent = useMemo(() => {
    return (
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        spacing={0}
        sx={{
          color: theme.palette.grey[600],
          borderRadius: 1,
          padding: theme.spacing(1.5, 1.25, 1.5, 0),
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: theme.palette.grey[500_8],
          },
          ...(isCollapse && {
            padding: theme.spacing(1.5),
          }),
          ...(active && {
            ...theme.typography.subtitle2,
            color: theme.palette.primary.main,
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity
            ),
          }),
        }}
        onClick={onToggle}
      >
        <Stack direction='row' alignItems='center'>
          {icon && (
            <ListItemIconStyle ownerState={{ active, isCollapse }}>
              {icon}
            </ListItemIconStyle>
          )}

          {!isCollapse && (
            <Typography
              variant='subtitle2'
              sx={{ textTransform: 'capitalize', fontWeight: 500 }}
            >
              {title}
            </Typography>
          )}
        </Stack>

        {!isCollapse && children && <ArrowIcon open={open} />}
      </Stack>
    )
  }, [active, children, icon, onToggle, open, theme, title, isCollapse])

  if (children) {
    return <>{renderContent}</>
  }

  return (
    <RouterLink to={path} style={{ textDecoration: 'none' }}>
      {renderContent}
    </RouterLink>
  )
}

export function NavItemSub({ item = {}, open = false, onToggle }) {
  const { title = '', children, path = '' } = item || {}
  const theme = useTheme()

  const { pathname } = useLocation()
  const active = getActive(path, pathname)

  const renderContent = useMemo(() => {
    return (
      <Stack
        direction='row'
        alignItems='center'
        spacing={0}
        onClick={onToggle}
        sx={{
          color: theme.palette.grey[600],
          borderRadius: 1,
          padding: theme.spacing(0.75, 0),
          cursor: 'pointer',
          ...(active && {
            ...theme.typography.subtitle2,
            color: theme.palette.primary.main,
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity
            ),
          }),
          '&:hover': {
            backgroundColor: theme.palette.grey[500_8],
          },
        }}
      >
        <DotIcon />

        <Typography variant='caption' sx={{ textTransform: 'capitalize' }}>
          {title}
        </Typography>

        {children && <ArrowIcon open={open} />}
      </Stack>
    )
  }, [active, children, onToggle, open, theme, title])

  if (children) return <>{renderContent}</>

  return (
    <RouterLink to={path} style={{ textDecoration: 'none' }}>
      {renderContent}
    </RouterLink>
  )
}

export function DotIcon({ active }) {
  return (
    <ListItemIconStyle>
      <Box
        component='span'
        sx={{
          minWidth: 4,
          minHeight: 4,
          width: 3,
          height: 3,
          borderRadius: '50%',
          bgcolor: 'text.disabled',
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: 'scale(2)',
            bgcolor: 'primary.main',
          }),
        }}
      />
    </ListItemIconStyle>
  )
}

export function ArrowIcon({ open }) {
  return (
    <Iconify
      icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
      sx={{ width: 16, height: 16, ml: 1 }}
    />
  )
}
