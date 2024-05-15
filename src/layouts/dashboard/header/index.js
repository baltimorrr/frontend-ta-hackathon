// @mui
import { AppBar, Toolbar } from '@mui/material'
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'

// components
import Iconify from 'components/Iconify'
import Logo from 'components/Logo'
import IconButtonAnimate from 'components/animate/IconButtonAnimate'

// hooks
import useResponsive from 'hooks/useResponsive'

// utils
import cssStyles from 'utils/cssStyles'

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: 'none',
  height: 60,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: 90,
    width: `calc(100% - ${220 + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${90}px)`,
    }),
    // ...(isOffset && {
    //   height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    // }),
    // ...(verticalLayout && {
    //   width: '100%',
    //   height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    //   backgroundColor: theme.palette.background.default,
    // }),
  },
}))

DashboardHeader.propTypes = {
  onOpenSidebar: PropTypes.func,
  isCollapse: PropTypes.bool,
  verticalLayout: PropTypes.bool,
}

export default function DashboardHeader({
  onOpenSidebar,
  isCollapse = false,
  verticalLayout = false,
}) {
  //   const isOffset =
  //     useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout

  const isDesktop = useResponsive('up', 'lg')

  return (
    <RootStyle
      isCollapse={isCollapse}
      isOffset={isOffset}
      verticalLayout={verticalLayout}
    >
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 5 },
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

        {!isDesktop && (
          <IconButtonAnimate
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: 'text.primary' }}
          >
            <Iconify icon='eva:menu-2-fill' />
          </IconButtonAnimate>
        )}
      </Toolbar>
    </RootStyle>
  )
}
