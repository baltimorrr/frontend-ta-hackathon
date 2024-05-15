import {
  Typography,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Box,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'

Breadcrumbs.propTypes = {
  links: PropTypes.array.isRequired,
  activeLast: PropTypes.bool,
}
// activeLast la gi
export default function Breadcrumbs({ links, activeLast = false, ...other }) {
  const theme = useTheme()
  const currentLink = links[links.length - 1].name

  const listDefault = links.map((link) => (
    <LinkItem key={link.name} link={link} />
  ))

  const listActiveLast = links.map((link) => (
    <div key={link.name}>
      {(() => {
        if (link?.name !== currentLink) return <LinkItem link={link} />

        return (
          <Typography
            variant='body2'
            sx={{
              overflow: 'hidden',
              color: 'text.disabled',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              [theme.breakpoints.up('md')]: {
                WebkitLineClamp: 1,
              },
            }}
          >
            {link?.name}
          </Typography>
        )
      })()}
    </div>
  ))

  return (
    <MuiBreadcrumbs
      separator={
        <Box
          component='span'
          sx={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            bgcolor: 'text.disabled',
          }}
        />
      }
      {...other}
    >
      {activeLast ? listDefault : listActiveLast}
    </MuiBreadcrumbs>
  )
}

function LinkItem({ link }) {
  const { href, name, icon } = link || {}

  return (
    <Link
      key={name}
      variant='body2'
      component={RouterLink}
      to={href || '#'}
      sx={{
        lineHeight: 2,
        display: 'flex',
        alignItems: 'center',
        color: 'text.primary',
        textDecoration: 'none',
        '& > div': { display: 'inherit' },
      }}
    >
      {icon && (
        <Box sx={{ mr: 1, '& svg': { width: 20, height: 20 } }}>{icon}</Box>
      )}
      {name}
    </Link>
  )
}
