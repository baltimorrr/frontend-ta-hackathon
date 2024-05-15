import { useRef } from 'react'
import { Box, GlobalStyles } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import IconButtonAnimate from 'components/animate/IconButtonAnimate'
import Iconify from './Iconify'

function SnackbarStyles() {
  const theme = useTheme()

  const isLight = theme.palette.mode === 'light'

  return (
    <GlobalStyles
      styles={{
        '#root': {
          '& .SnackbarContent-root': {
            width: '100%',
            padding: theme.spacing(1),
            margin: theme.spacing(0.25, 0),
            boxShadow: theme.customShadows.z8,
            borderRadius: theme.shape.borderRadius,
            color: theme.palette.grey[isLight ? 0 : 800],
            backgroundColor: theme.palette.grey[isLight ? 900 : 0],
            '&.SnackbarItem-variantSuccess, &.SnackbarItem-variantError, &.SnackbarItem-variantWarning, &.SnackbarItem-variantInfo':
              {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              },
            [theme.breakpoints.up('md')]: {
              minWidth: 240,
            },
          },
          '& .SnackbarItem-message': {
            padding: '0 !important',
            fontWeight: theme.typography.fontWeightMedium,
            maxWidth: 400,
          },
          '& .SnackbarItem-action': {
            marginRight: 0,
            color: theme.palette.action.active,
            '& svg': { width: 20, height: 20 },
          },
        },
      }}
    />
  )
}

export default function NotistackProvider({ children }) {
  const notistackRef = useRef(null)

  const onClose = (key) => () => {
    notistackRef.current.closeSnackbar(key)
  }

  return (
    <>
      <SnackbarStyles />

      <SnackbarProvider
        ref={notistackRef}
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={2000}
        TransitionComponent={undefined}
        variant='success' // Set default variant
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        iconVariant={{
          info: <SnackbarIcon icon={'eva:info-fill'} color='info' />,
          success: (
            <SnackbarIcon
              icon={'eva:checkmark-circle-2-fill'}
              color='success'
            />
          ),
          warning: (
            <SnackbarIcon icon={'eva:alert-triangle-fill'} color='warning' />
          ),
          error: <SnackbarIcon icon={'eva:alert-circle-fill'} color='error' />,
        }}
        // With close as default
        action={(key) => (
          <IconButtonAnimate
            size='small'
            onClick={onClose(key)}
            sx={{ p: 0.5 }}
          >
            <Iconify icon={'eva:close-fill'} />
          </IconButtonAnimate>
        )}
      >
        {children}
      </SnackbarProvider>
    </>
  )
}

function SnackbarIcon({ icon, color }) {
  return (
    <Box
      component='span'
      sx={{
        mr: 1.5,
        minWidth: 40,
        minHeight: 40,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        color: `${color}.main`,
        bgcolor: (theme) => alpha(theme.palette[color].main, 0.16),
      }}
    >
      <Iconify icon={icon} width={24} height={24} />
    </Box>
  )
}
