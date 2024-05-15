import { Controller, useFormContext } from 'react-hook-form'
import { useReactHookForm } from './FormProvider'
import { DATE_FORMAT } from 'config'
import { MIN_DATE_VALUE } from 'config'
import { useCallback } from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import { TextField } from '@mui/material'

export default function RHFDatePicker({
  name,
  label,
  DatePickerProps,
  inputProps,
  ...other
}) {
  const { control } = useFormContext()
  const { checkFormChanged = false, setIsFormProviderChanged } =
    useReactHookForm()

  const props = {
    inputFormat: DATE_FORMAT,
    componentProps: {
      actionBar: { actions: ['clear', 'today'] },
    },
    minDate: MIN_DATE_VALUE,
    onchange: (field, callback) => (newValue) => {
      field?.onChange(newValue)
      callback?.()
    },
    ...DatePickerProps,
  }

  const { onChange, ...rest } = props

  const handleFormChanged = useCallback(() => {
    setIsFormProviderChanged(checkFormChanged)
  }, [checkFormChanged, setIsFormProviderChanged])

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          label={label}
          onChange={onChange(field, handleFormChanged)}
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
