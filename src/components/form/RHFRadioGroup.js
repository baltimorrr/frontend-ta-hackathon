import {
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

export default function RHFRadioGroup({ name, options, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack flexShrink={0}>
          <RadioGroup {...field} row {...other}>
            {options.map((option) => (
              <FormControlLabel
                key={option?.value}
                value={option?.value}
                control={<Radio />}
                label={option?.label}
              />
            ))}
          </RadioGroup>

          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error?.message}
            </FormHelperText>
          )}
        </Stack>
      )}
    />
  )
}
