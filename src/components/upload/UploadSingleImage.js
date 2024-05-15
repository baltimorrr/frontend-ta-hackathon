import { alpha, styled } from '@mui/material/styles'
import { ACCEPTED_IMAGE_FILE_TYPES, MAX_SIZE_FILE_IMAGE } from 'config'
import useLocales from 'hooks/useLocales'
import { useCallback, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useDropzone } from 'react-dropzone'
import { fFileSize } from 'utils/formatNumber'
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material'
import Image from 'components/Image'
import Iconify from 'components/Iconify'
import UploadFilePreview from './UploadFilePreview'

const DropZoneStyle = styled('div')(({ theme }) => {
  const isLight = theme.palette.mode === 'light'
  const backgroundColor = isLight
    ? alpha(theme.palette.primary.lighter, 0.4)
    : alpha(theme.palette.primary.darker, 0.12)

  return {
    width: '100%',
    height: '100%',
    outline: 'none',
    position: 'relative',
    padding: theme.spacing(2, 1),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create('padding'),
    backgroundColor,
    border: `1px dashed ${theme.palette.grey[500_32]}`,
    '&:hover': { opacity: 0.72, cursor: 'pointer' },
  }
})

export default function UploadSingleImage({
  error = false,
  sx,
  maxSize = MAX_SIZE_FILE_IMAGE,
  accept = ACCEPTED_IMAGE_FILE_TYPES,
  onUpload = () => {},
  ...other
}) {
  const [uploadFiles, setUploadFiles] = useState([])
  const [preview, setPreview] = useState('')
  const { translate } = useLocales()
  const { enqueueSnackbar } = useSnackbar()

  const onDrop = useCallback(
    (newAcceptedFiles, newRejectFiles) => {
      const currentUploadFiles = [
        ...uploadFiles,
        ...newAcceptedFiles,
        ...newRejectFiles,
      ]

      if (currentUploadFiles.length > 1) {
        enqueueSnackbar('Upload image error', {
          variant: 'error',
        })
        return
      }

      onUpload?.(newAcceptedFiles)
      setPreview(
        newAcceptedFiles.length ? URL.createObjectURL(newAcceptedFiles[0]) : ''
      )
      setUploadFiles((prev) => [
        ...prev,
        ...newAcceptedFiles.map((file) => ({ file, errors: [] })),
        ...newRejectFiles.map((rejectFile) => ({ ...rejectFile })),
      ])
    },
    [enqueueSnackbar, onUpload, uploadFiles]
  )

  const onDeleteFile = useCallback((currentFile) => {
    setUploadFiles((prev) => prev.filter(({ file }) => file !== currentFile))
  }, [])

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      multiple: false,
      accept,
      onDrop,
      validator: (file) => {
        if (!accept.includes(file?.type)) {
          return {
            code: 'file-invalid-type',
            message: translate('singleImageUpload.error.imageOnly'),
          }
        }

        if (file?.size > maxSize) {
          return {
            code: 'file-too-large',
            message: translate(
              'singleImageUpload.error.tooLargeSizeSingleFile',
              {
                fileSize: fFileSize(MAX_SIZE_FILE_IMAGE),
              }
            ),
          }
        }

        return null
      },
      ...other,
    })

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter',
          }),
        }}
      >
        <input {...getInputProps()} />

        {uploadFiles.length > 0 ? (
          <>
            {preview && (
              <Box>
                <Image
                  src={preview}
                  alt='preview'
                  sx={{
                    top: 8,
                    left: 8,
                    borderRadius: 1,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>
            )}
          </>
        ) : (
          <Grid container spacing={2}>
            <Grid item md={10} xs={12}>
              <Stack spacing={2} alignItems='center' justifyContent='center'>
                <Typography gutterBottom variant='h6'>
                  {translate('singleImageUpload.title')}
                </Typography>

                <Stack alignItems='center' justifyContent='center'>
                  <Typography variant='body2'>
                    {translate('singleImageUpload.imageOnly', {
                      fileSize: fFileSize(MAX_SIZE_FILE_IMAGE),
                    })}
                  </Typography>

                  <Typography variant='body2'>
                    {translate('singleImageUpload.singleFile')}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid item md={2} xs={12}>
              <Stack
                alignItems='center'
                justifyContent='center'
                width='100%'
                height='100%'
              >
                <IconButton color='primary'>
                  <Iconify
                    icon='material-symbols:cloud-upload'
                    width={48}
                    height={48}
                  />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        )}
      </DropZoneStyle>

      <UploadFilePreview
        uploadFiles={uploadFiles}
        onDeleteFile={onDeleteFile}
      />
    </Box>
  )
}
