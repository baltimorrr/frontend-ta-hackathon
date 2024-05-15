import { Box, Paper, Typography } from '@mui/material'
import { useTheme, alpha } from '@mui/material/styles'
import { fFileSize } from 'utils/formatNumber'
import { getFileData } from 'utils/helpers'

export default function RejectionFiles({ fileRejections }) {
  const theme = useTheme()
  return (
    <Paper
      variant='outlined'
      sx={{
        p: 1,
        mt: 3,
        borderColor: 'error.light',
        backgroundColor: alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = getFileData(file)

        return (
          <Box key={path} my={1}>
            <Typography variant='subtitle2' noWrap>
              {path} - {size ? fFileSize(size) : 0}
            </Typography>

            {errors.map((error) => (
              <Box
                key={error.code}
                component='li'
                sx={{ typography: 'caption' }}
              >
                {error?.message}
              </Box>
            ))}
          </Box>
        )
      })}
    </Paper>
  )
}
