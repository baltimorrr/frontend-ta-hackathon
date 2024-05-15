import { Controller, useFormContext } from 'react-hook-form'
import { useReactHookForm } from './FormProvider'
import { FormControlLabel, Switch } from '@mui/material'

export default function RHFSwitch({ name, disabled = false, ...other }) {
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
            <Switch
              {...field}
              checked={field.value}
              onChange={(event) => {
                setIsFormProviderChanged(checkFormChanged)
                field.onChange(event?.target?.checked)
              }}
              disabled={disabled}
            />
          )}
        />
      }
      {...other}
    />
  )
}
