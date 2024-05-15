import { Box, CircularProgress } from '@mui/material'

function Loading({ sx, ...other }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 1,
        height: 1,
        ...sx,
      }}
      {...other}
    >
      <CircularProgress />
    </Box>
  )
}

export default Loading
