import { forwardRef, useCallback } from 'react'
import { Box, Card, CardActions, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import { SnackbarContent, useSnackbar } from 'notistack'
import Iconify from 'components/Iconify'
import IconButtonAnimate from 'components/animate/IconButtonAnimate'
import TextMaxLine from './TextMaxLine'

function renderIcon(type) {
  const config = {
    test: {
      icon: <Iconify icon={'bxs:bell'} />,
    },
  }

  return config[type] || {}
}

const CardStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  borderRadius: `${theme.spacing(1)} !important`,
  boxShadow: `0px 0px 12px 3px ${theme.palette.primary.main} !important`,
  padding: theme.spacing(0.75),
}))

const TextMaxLineStyle = styled(TextMaxLine)(({ theme }) => {
  const isLight = theme.palette.mode === 'light'

  return {
    color: theme.palette.grey[isLight ? 600 : 500],
    fontSize: theme.typography.pxToRem(12),
  }
})

const CardActionsStyle = styled(CardActions)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(0.25),
  justifyContent: 'space-between',
  alignItems: 'flex-start !important',
}))

const SnackbarContentStyle = styled(SnackbarContent)(({ theme }) => ({
  backgroundColor: 'transparent !important',
  padding: '0 !important',
  maxWidth: '344px',
  [theme.breakpoints.up('sm')]: {
    minWidth: '344px !important',
  },
}))

const NotifySnackbar = forwardRef(({ id = '', message = '' }, ref) => {
  const { closeSnackbar } = useSnackbar()
  const { icon } = renderIcon('test')

  const hasTitle = message

  const onClose = useCallback(() => {
    closeSnackbar(id)
  }, [id, closeSnackbar])

  return (
    <SnackbarContentStyle ref={ref}>
      <CardStyle>
        <CardActionsStyle>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='center'
            sx={{ height: 69 }}
          >
            <IconButtonAnimate
              size='medium'
              onClick={onClose}
              sx={{ color: `primary.main` }}
            >
              {icon}
            </IconButtonAnimate>
          </Stack>

          <Box sx={{ width: 254, overflow: 'hidden' }}>
            <TextMaxLine variant='subtitle2' line={hasTitle ? 1 : 2}>
              {message}
            </TextMaxLine>

            <TextMaxLineStyle variant='body2' line={2}>
              {message}
            </TextMaxLineStyle>
          </Box>

          <IconButtonAnimate size='small' onClick={onClose} sx={{ p: 0.25 }}>
            <Iconify icon={'eva:close-fill'} />
          </IconButtonAnimate>
        </CardActionsStyle>

        <Stack
          direction='row'
          alignItems='flex-start'
          justifyContent='flex-end'
          sx={{ color: 'grey.500' }}
        >
          <Iconify
            icon='eva:clock-outline'
            sx={{ mr: 0.5, width: 16, height: 16 }}
          />
          <TextMaxLineStyle variant='body2' line={1} maxWidth={240}>
            {message}
          </TextMaxLineStyle>
        </Stack>
      </CardStyle>
    </SnackbarContentStyle>
  )
})

export default NotifySnackbar
