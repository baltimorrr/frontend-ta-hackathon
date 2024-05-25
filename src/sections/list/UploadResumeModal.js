import ConfirmDialog from 'components/ConfirmDialog'
import Loading from 'components/Loading'
import FormProvider from 'components/form/FormProvider'
import RHFUploadCV from 'components/form/RHFUploadCV'
import { useSnackbar } from 'notistack'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { _uploadApi } from 'utils/axios'

export default function UploadResumeModal({ open, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const methods = useForm({
    defaultValues: {
      resumeFile: '',
    },
  })

  const handleUploadCVFile = useCallback(
    async (file) => {
      try {
        setIsSubmitting(true)
        const res = await _uploadApi('resume/upload', { file })
        console.log('res', res)
        setIsSubmitting(false)
        enqueueSnackbar('Upload file success')
        onClose()
      } catch (error) {
        setIsSubmitting(false)
        enqueueSnackbar('Upload file fail! Please try again', {
          variant: 'error',
        })
      }
    },
    [enqueueSnackbar, onClose]
  )

  const onUploadCV = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0]

      handleUploadCVFile?.(file)
    },
    [handleUploadCVFile]
  )

  return (
    <FormProvider methods={methods}>
      <ConfirmDialog
        maxWidth='md'
        title={'Upload Resume'}
        open={open}
        onClose={onClose}
      >
        {isSubmitting ? (
          <Loading />
        ) : (
          <RHFUploadCV name='resumeFile' onUpload={onUploadCV} />
        )}
      </ConfirmDialog>
    </FormProvider>
  )
}
