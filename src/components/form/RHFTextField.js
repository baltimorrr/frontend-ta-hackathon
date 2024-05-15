import { Controller, useFormContext } from 'react-hook-form'
import { TextField } from '@mui/material'

export default function RHFTextField({
  name,
  disabled = false,
  TextFieldProps,
  ...other
}) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          checked={field.value}
          disabled={disabled}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  )
}
