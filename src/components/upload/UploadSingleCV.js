import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

// @mui
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

import { useSnackbar } from 'notistack'

import Iconify from 'components/Iconify'
import { getFileData } from 'utils/helpers'
import { fFileSize } from 'utils/formatNumber'

//
const DropZoneStyle = styled('div')(({ theme }) => {
  const isLight = theme.palette.mode === 'light'
  const backgroundColor = isLight
    ? alpha(theme.palette.primary.lighter, 0.4)
    : alpha(theme.palette.primary.darker, 0.12)

  return {
    outline: 'none',
    overflow: 'hidden',
    position: 'relative',
    padding: theme.spacing(2, 1),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create('padding'),
    backgroundColor,
    border: `1px dashed ${theme.palette.grey[500_32]}`,
    '&:hover': { opacity: 0.72, cursor: 'pointer' },
  }
})

export default function UploadSingleCV({
  error = false,
  file,
  helperText,
  sx,
  maxSize = 20 * 1024 * 1024,
  accept = 'application/pdf,.doc,.docx',
  onCancel = () => {},
  onUpload = () => {},
  ...other
}) {
  const [uploadFiles, setUploadFiles] = useState([])
  const [acceptedFiles, setAcceptedFiles] = useState([])
  const { enqueueSnackbar } = useSnackbar()

  const onDrop = useCallback(
    (newAcceptedFiles, newRejectFiles) => {
      const currentUploadFiles = [
        ...uploadFiles,
        ...newAcceptedFiles,
        ...newRejectFiles,
      ]

      if (currentUploadFiles.length > 1) {
        enqueueSnackbar('Upload file error', {
          variant: 'error',
        })
        return
      }

      setAcceptedFiles((prev) => [...prev, ...newAcceptedFiles])
      setUploadFiles((prev) => [
        ...prev,
        ...newAcceptedFiles.map((file) => ({ file, errors: [] })),
        ...newRejectFiles.map((rejectFile) => ({ ...rejectFile })),
      ])
    },
    [enqueueSnackbar, uploadFiles]
  )

  const onDeleteFile = useCallback((currentFile, isValidFile = false) => {
    setUploadFiles((prev) => prev.filter(({ file }) => file !== currentFile))

    if (!isValidFile) return

    setAcceptedFiles((prev) => prev.filter((file) => file !== currentFile))
  }, [])

  const onResetData = useCallback(() => {
    setUploadFiles([])
    setAcceptedFiles([])
  }, [])

  const handleCancelUploadForm = useCallback(() => {
    onResetData()
    onCancel?.()
  }, [onCancel, onResetData])

  const handleSubmitUploadForm = useCallback(() => {
    onUpload?.(acceptedFiles)
    onResetData()
  }, [acceptedFiles, onResetData, onUpload])

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      multiple: false,
      accept: {
        'application/pdf': ['.pdf'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          ['.docx'],
        'application/msword': ['.doc'],
      },
      // maxSize,
      onDrop,
      validator: (file) => {
        if (
          ![
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword',
          ].includes(file?.type)
        ) {
          return {
            code: 'file-invalid-type',
            message: 'You should be upload file pdf or docx or doc ',
          }
        }

        if (file?.size > maxSize) {
          return {
            code: 'file-too-large',
            message: 'This file is too large',
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

        <Grid container spacing={2}>
          <Grid item md={10} xs={12}>
            <Stack spacing={2} alignItems='center' justifyContent='center'>
              <Typography gutterBottom variant='h6'>
                Upload File
              </Typography>

              <Stack alignItems='center' justifyContent='center'>
                <Typography variant='body2'>
                  You can only upload pdf, docx, doc file
                </Typography>

                <Typography variant='body2'>
                  You can only upload 1 file
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
      </DropZoneStyle>

      {helperText && helperText}

      {uploadFiles.length > 0 && (
        <>
          <UploadCVPreview
            uploadFiles={uploadFiles}
            onDeleteFile={onDeleteFile}
          />

          <Grid
            container
            alignItems='center'
            justifyContent='center'
            sx={{ mt: 3 }}
          >
            <Grid item xs={6}>
              <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                justifyContent='center'
              >
                <Button variant='outlined' onClick={handleCancelUploadForm}>
                  Cancel
                </Button>

                <Button
                  variant='contained'
                  disabled={!acceptedFiles.length}
                  onClick={handleSubmitUploadForm}
                >
                  Upload
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  )
}

function UploadCVPreview({ uploadFiles, onDeleteFile, ...other }) {
  return (
    <>
      <List disablePadding {...other}>
        {uploadFiles.map(({ file, errors = [] }, index) => {
          const { path, size, name } = getFileData(file)

          if (!Array.isArray(errors) || !errors.length)
            return (
              <ListItem
                key={`${path}-${index}`}
                sx={{
                  my: 2,
                  px: 2,
                  py: 0.75,
                  borderRadius: 0.75,
                  border: (theme) => `solid 1px ${theme.palette.divider}`,
                }}
              >
                <Iconify
                  icon={'eva:file-fill'}
                  sx={{ width: 28, height: 28, color: 'text.secondary', mr: 2 }}
                />

                <ListItemText
                  primary={typeof file === 'string' ? file : name}
                  secondary={
                    typeof file === 'string' ? '' : fFileSize(size) || 0
                  }
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />

                <IconButton
                  color='primary'
                  onClick={() => onDeleteFile(file, true)}
                >
                  <Iconify icon='eva:close-fill' />
                </IconButton>
              </ListItem>
            )

          return (
            <ListItem
              key={`${path}-${index}`}
              sx={{
                my: 2,
                px: 2,
                py: 0.75,
                borderRadius: 0.75,
                border: (theme) => `solid 1px ${theme.palette.error.dark}`,
              }}
            >
              <Iconify
                icon={'eva:file-fill'}
                sx={{ width: 28, height: 28, color: 'text.secondary', mr: 2 }}
              />

              <ListItemText
                primary={typeof file === 'string' ? file : name}
                secondary={errors?.[0]?.message || ''}
                primaryTypographyProps={{
                  variant: 'subtitle2',
                  color: 'error.dark',
                }}
                secondaryTypographyProps={{
                  variant: 'caption',
                  color: 'error.dark',
                }}
              />

              <IconButton color='primary' onClick={() => onDeleteFile(file)}>
                <Iconify icon='eva:close-fill' />
              </IconButton>
            </ListItem>
          )
        })}
      </List>
    </>
  )
}
