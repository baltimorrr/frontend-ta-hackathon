import { Controller, useFormContext } from 'react-hook-form'
import { useReactHookForm } from './FormProvider'
import { Checkbox, FormControlLabel } from '@mui/material'
import PropTypes from 'prop-types'

RHFCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

export default function RHFCheckbox({ name, disabled = false, ...other }) {
  const { control } = useFormContext()
  const { checkFormChanged = false, setIsFormProviderChanged } =
    useReactHookForm()

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              onChange={(event) => {
                setIsFormProviderChanged(checkFormChanged)
                field.onChange(event?.target?.checked)
              }}
              checked={field.value}
              disabled={disabled}
            />
          )}
        />
      }
    />
  )
}
