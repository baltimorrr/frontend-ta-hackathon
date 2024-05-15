import { Box, Link, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import { PATH_DASHBOARD } from 'routes/path'
import Breadcrumbs from './Breadcrumbs'

export default function HeaderBreadcrumbs({
  links,
  action,
  heading,
  moreLink = '' || [],
  sx,
  ...other
}) {
  const linkBaseRole = useMemo(() => {
    if (!Array.isArray(links) || !links.length) return null

    const getHomeLink = () => {
      return {
        name: 'Dashboard',
        href: PATH_DASHBOARD.root,
      }
    }

    const homeLink = getHomeLink()

    return [].concat(homeLink).concat(links)
  }, [links])

  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Stack direction='row' alignItems='center'>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant='h4' gutterBottom>
            {heading}
          </Typography>

          {linkBaseRole && <Breadcrumbs links={linkBaseRole} {...other} />}
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Stack>

      <Box sx={{ mt: 2 }}>
        {(() => {
          if (typeof moreLink === 'string')
            return (
              <Link
                href={moreLink}
                target='_blank'
                rel='noopener'
                variant='body2'
              >
                {moreLink}
              </Link>
            )

          return moreLink.map((href) => (
            <Link
              noWrap
              key={href}
              href={href}
              variant='body2'
              target='_blank'
              rel='noopener'
              sx={{ display: 'table' }}
            >
              {href}
            </Link>
          ))
        })()}
      </Box>
    </Box>
  )
}
