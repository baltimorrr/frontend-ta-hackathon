import { Controller, useFormContext } from 'react-hook-form'
import { DATETIME_FORMAT, MIN_DATE_VALUE } from 'config'
import { DateTimePicker } from '@mui/x-date-pickers'
import { TextField } from '@mui/material'

export default function RHFDateTimePicker({
  name,
  label,
  DateTimePickerProps,
  ...other
}) {
  const { control } = useFormContext()

  const props = {
    inputFormat: DATETIME_FORMAT,
    componentProps: {
      actionBar: { actions: ['clear', 'today'] },
    },
    minDate: MIN_DATE_VALUE,
    ...DateTimePickerProps,
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DateTimePicker
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
