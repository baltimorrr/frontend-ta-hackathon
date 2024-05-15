// @mui
import { Box, Stack, Typography } from '@mui/material'

// assets

export default function BlockContent() {
  return (
    <Stack
      spacing={2}
      alignItems='center'
      justifyContent='center'
      direction={{ xs: 'column', md: 'row' }}
      sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
    >
      {/* <UploadIllustration sx={{ width: 220 }} /> */}

      <Box sx={{ p: 3 }}>
        <Typography gutterBottom variant='h5'>
          Drop or Select image
        </Typography>

        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          Drop image here or click&nbsp;
          <Typography
            variant='body2'
            component='span'
            sx={{ color: 'primary.main', textDecoration: 'underline' }}
          >
            Browse
          </Typography>
          &nbsp;thorough your machine
        </Typography>
      </Box>
    </Stack>
  )
}
