// @mui
import { Grid } from '@mui/material'

// components
import RHFDatePicker from 'components/form/RHFDatePicker'
import FormProvider from 'components/form/FormProvider'
import { useForm } from 'react-hook-form'

export default function ChatToolbar() {
  const methods = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
    },
  })
  return (
    <FormProvider methods={methods}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <RHFDatePicker label='Start Date' name='startDate' size='small' />
        </Grid>

        <Grid item xs={6}>
          <RHFDatePicker label='End Date' name='endDate' size='small' />
        </Grid>
      </Grid>
    </FormProvider>
  )
}
