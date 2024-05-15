import { Controller, useFormContext } from 'react-hook-form'
import { TIME_FORMAT } from 'config'
import { TimePicker } from '@mui/x-date-pickers'
import { TextField } from '@mui/material'

export default function RHFTimePicker({
  name,
  label,
  TimePickerProps,
  ...other
}) {
  const { control } = useFormContext()

  const props = {
    inputFormat: TIME_FORMAT,
    componentProps: {
      actionBar: { actions: ['clear', 'today'] },
    },
    ...TimePickerProps,
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TimePicker
          {...field}
          label={label}
          {...props}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!error}
              helperText={error?.message}
              fullWidth
              {...other}
            />
          )}
        />
      )}
    />
  )
}
