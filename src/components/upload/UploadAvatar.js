import { Avatar, Typography } from '@mui/material'
import Iconify from 'components/Iconify'
import { useDropzone } from 'react-dropzone'
import RejectionFiles from './RejectionFiles'
import { styled } from '@mui/material/styles'

const RootStyled = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  margin: 'auto',
  borderRadius: '50%',
  padding: theme.spacing(1),
  border: `1px dashed ${theme.palette.grey[500_32]}`,
}))

const DropZoneStyled = styled('div')({
  zIndex: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '50%',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { width: '100%', height: '100%' },
  '&:hover': {
    cursor: 'pointer',
    '& .placeholder': {
      zIndex: 9,
    },
  },
})

const PlaceholderStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': { opacity: 0.72 },
}))

export default function UploadAvatar({
  error,
  file,
  helperText,
  sx,
  onDrop,
  ...other
}) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    onDrop,
    ...other,
  })

  return (
    <>
      <RootStyled
        sx={{
          ...((isDragReject || error) && {
            borderColor: 'error.light',
          }),
          ...sx,
        }}
      >
        <DropZoneStyled
          {...getRootProps()}
          sx={{
            ...(isDragActive && {
              opacity: 0.72,
            }),
          }}
        >
          <input {...getInputProps()} />

          <Avatar
            src={file?.preview}
            width='100%'
            height='100%'
            sx={{ zIndex: 8 }}
          />

          <PlaceholderStyled
            className='placeholder'
            sx={{
              ...(file && {
                opacity: 0,
                color: 'common.white',
                bgcolor: 'grey.900',
                '&:hover': { opacity: 0.72 },
              }),
              ...((isDragReject || error) && {
                bgcolor: 'error.lighter',
              }),
            }}
          >
            <Iconify
              icon='ic:round-add-a-photo'
              sx={{
                width: 24,
                height: 24,
                mb: 1,
              }}
            />

            <Typography variant='caption'>
              {file ? 'Update photo' : 'Upload photo'}
            </Typography>
          </PlaceholderStyled>
        </DropZoneStyled>
      </RootStyled>

      {helperText && helperText}

      {fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}
    </>
  )
}
