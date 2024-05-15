import { Controller, useFormContext } from 'react-hook-form'
import { Box, FormHelperText } from '@mui/material'
import { useReactHookForm } from './FormProvider'
import UploadAvatar from 'components/upload/UploadAvatar'

export default function RHFUploadAvatar({ name, sx, onDrop, ...other }) {
  const { control } = useFormContext()
  const { checkFormChanged = false, setIsFormProviderChanged } =
    useReactHookForm()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !!field?.value

        return (
          <Box sx={{ width: '100%', flexShrink: 0, ...sx }}>
            <UploadAvatar
              error={checkError}
              onDrop={(acceptedFiles, fileRejections, event) => {
                onDrop?.(acceptedFiles, fileRejections, event)
                setIsFormProviderChanged(checkFormChanged)
              }}
              {...other}
              file={field.value}
            />

            {checkError && (
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {error?.message}
              </FormHelperText>
            )}
          </Box>
        )
      }}
    />
  )
}
