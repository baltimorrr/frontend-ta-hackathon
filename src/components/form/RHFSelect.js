import { Controller, useFormContext } from 'react-hook-form'
import { useReactHookForm } from './FormProvider'
import { TextField } from '@mui/material'

export default function RHFSelect({
  name,
  children,
  TextFieldProps,
  ...other
}) {
  const { control } = useFormContext()
  const { checkFormChanged = false, setIsFormProviderChange } =
    useReactHookForm()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          onChange={(event) => {
            setIsFormProviderChange(checkFormChanged)

            if (TextFieldProps?.onChange) {
              TextFieldProps.onChange(event, field)
              return
            }

            field.onChange(event?.target?.value)
          }}
          select
          fullWidth
          SelectProps={{
            native: true,
          }}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  )
}
