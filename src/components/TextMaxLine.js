import { forwardRef } from 'react'
import { Link, Typography } from '@mui/material'
import GetFontValue from 'utils/getFontValue'

const TextMaxLine = forwardRef(
  (
    {
      asLink,
      variant = 'body1',
      line = 2,
      persistent = false,
      children,
      sx,
      ...other
    },
    ref
  ) => {
    const { lineHeight } = GetFontValue(variant)

    const style = {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: line,
      WebkitBoxOrient: 'vertical',
      wordBreak: 'break-word',
      ...(persistent && {
        height: lineHeight * line,
      }),
      ...sx,
    }

    if (asLink) {
      return (
        <Link
          color='inherit'
          ref={ref}
          variant={variant}
          sx={{ ...style }}
          {...other}
        >
          {children}
        </Link>
      )
    }

    return (
      <Typography ref={ref} variant={variant} sx={{ ...style }} {...other}>
        {children}
      </Typography>
    )
  }
)
export default TextMaxLine
