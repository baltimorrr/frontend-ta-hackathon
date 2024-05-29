// form
import { Controller, useFormContext } from 'react-hook-form'

// @mui
import { TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

import PropTypes from 'prop-types'

// config
import { DATE_FORMAT, MIN_DATE_VALUE } from 'config'

RHFDatePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  DatePickerProps: PropTypes.object,
  inputProps: PropTypes.object,
}

export default function RHFDatePicker({
  name,
  label,
  DatePickerProps,
  inputProps,
  ...other
}) {
  const { control } = useFormContext()

  const props = {
    inputFormat: DATE_FORMAT,
    componentsProps: {
      actionBar: { actions: ['clear', 'today'] },
    },
    minDate: MIN_DATE_VALUE,
    onChange: (field, callback) => (newValue) => {
      field.onChange(newValue)
      callback?.()
    },
    ...DatePickerProps,
  }

  // eslint-disable-next-line react/prop-types
  const { onChange, ...rest } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          label={label}
          onChange={onChange(field)}
          {...rest}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!error}
              helperText={error?.message}
              fullWidth
              inputProps={{ ...params.inputProps, ...inputProps }}
              {...other}
            />
          )}
        />
      )}
    />
  )
}
