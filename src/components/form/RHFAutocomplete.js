import { useCallback } from 'react'

import { Controller, useFormContext } from 'react-hook-form'

import { Autocomplete, Chip, TextField } from '@mui/material'

import PropTypes from 'prop-types'

import { useReactHookForm } from './FormProvider'

RHFAutocomplete.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  AutocompleteProps: PropTypes.object,
}

export default function RHFAutocomplete({
  name = '',
  options = [],
  AutocompleteProps,
  ...other
}) {
  const { control } = useFormContext()
  const { checkFormChanged = false, setIsFormProviderChange } =
    useReactHookForm()

  const props = {
    onChange: (field, callback) => (event, newValue) => {
      field.onChange(newValue)
      callback?.()
    },
    renderTags: (value, getTagProps) =>
      value.map((option, index) => (
        <Chip
          {...getTagProps({ index })}
          key={option}
          size='small'
          label={option}
        />
      )),
    renderInput: (field, error) => (params) =>
      (
        <TextField
          {...field}
          fullWidth
          error={!error}
          helperText={error?.message || error?.value?.message}
          {...other}
          {...params}
        />
      ),
    ...AutocompleteProps,
  }

  const { onChange, onInputChange, renderTags, renderInput, ...rest } = props

  const handleFormChanged = useCallback(() => {
    setIsFormProviderChange(checkFormChanged)
  }, [checkFormChanged, setIsFormProviderChange])

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          fullWidth
          onChange={onChange(field, handleFormChanged)}
          options={options}
          renderTags={renderTags}
          renderInput={renderInput(field, error)}
          onInputChange={(event, value, reason) => {
            if (reason === 'reset') return
            onInputChange?.(event, value, reason)

            if (!rest?.freeSolo) return
            handleFormChanged()
          }}
          {...rest}
        />
      )}
    />
  )
}
