// @mui
import { Grid } from '@mui/material'

// components
import RHFDatePicker from 'components/form/RHFDatePicker'
import RHFBasicSelect from 'components/form/RHFBasicSelect'
import { LoadingButton } from '@mui/lab'
import { AI_MODEL_OPTIONS } from './config'

export default function ChatToolbar({ isSubmitting }) {
  return (
    <Grid container spacing={1} fullWidth>
      <Grid item xs={4}>
        <RHFBasicSelect name='model' options={AI_MODEL_OPTIONS} />
      </Grid>

      <Grid item xs={3}>
        <RHFDatePicker label='From Date' name='fromDate' />
      </Grid>

      <Grid item xs={3}>
        <RHFDatePicker label='To Date' name='toDate' />
      </Grid>

      <Grid item xs={2}>
        <LoadingButton
          type='submit'
          variant='contained'
          loading={isSubmitting}
          size='large'
          sx={{ height: '100%', width: '100%' }}
        >
          Search
        </LoadingButton>
      </Grid>
    </Grid>
  )
}
