// form
import { Controller, useFormContext } from 'react-hook-form'

// @mui
import { FormHelperText } from '@mui/material'

import UploadSingleCV from 'components/upload/UploadSingleCV'

export default function RHFUploadCV({ name, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value

        return (
          <UploadSingleCV
            file={field.value}
            error={checkError}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        )
      }}
    />
  )
}
