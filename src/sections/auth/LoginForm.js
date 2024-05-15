import { Card, InputAdornment, Stack, Typography } from '@mui/material'
import FormProvider from 'components/form/FormProvider'
import RHFTextField from 'components/form/RHFTextField'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Iconify from 'components/Iconify'
import { LoadingButton } from '@mui/lab'
import useAuth from 'hooks/useAuth'
import { LOGIN_FORM_DEFAULT_VALUES, LOGIN_FORM_FIELDS } from './config'

export default function LoginForm() {
  const { dispatch } = useAuth()
  const LoginSchema = Yup.object().shape({
    [LOGIN_FORM_FIELDS.EMAIL]: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    [LOGIN_FORM_FIELDS.PASSWORD]: Yup.string().required('Password is required'),
  })

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: LOGIN_FORM_DEFAULT_VALUES,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = (data) => {
    console.log(data)
    dispatch({
      type: 'INITIALIZE',
      payload: {
        isAuthenticated: true,
        user: {},
      },
    })
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3, maxWidth: 500, minWidth: 400 }}>
        <Typography variant='h4' sx={{ mb: 3, textAlign: 'center' }}>
          You must sign in to join
        </Typography>

        <Stack gap={2}>
          <RHFTextField
            name={LOGIN_FORM_FIELDS.EMAIL}
            label='Email'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Iconify
                    icon='material-symbols:person'
                    width={24}
                    height={24}
                  />
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField
            name={LOGIN_FORM_FIELDS.PASSWORD}
            label='Password'
            type='password'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Iconify
                    icon='material-symbols:lock-open'
                    width={24}
                    height={24}
                  />
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            variant='contained'
            size='large'
            type='submit'
            loading={isSubmitting}
          >
            <Typography variant='subtitle1'>Sign in</Typography>
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  )
}
