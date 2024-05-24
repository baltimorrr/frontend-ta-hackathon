import { LoadingButton } from '@mui/lab'
import { Card, Stack, Typography, alpha, useTheme, styled } from '@mui/material'
import zIndex from '@mui/material/styles/zIndex'
import FormProvider from 'components/form/FormProvider'
import RHFTextField from 'components/form/RHFTextField'
import { useForm } from 'react-hook-form'

const mockMessageData = [
  {
    type: 'yourself',
    message: 'iasdnasdnnas as das da sd as afas',
  },
  {
    type: 'yourself',
    message: 'iasdnasdnnas as das da sd as afas',
  },
  {
    type: 'bot',
    message: 'iasdnasdnnas as das da sd as afas',
  },
  {
    type: 'yourself',
    message: 'iasdnasdnnas as das da sd as afas',
  },
  {
    type: 'bot',
    message: 'iasdnasdnnas as das da sd as afas',
  },
  {
    type: 'bot',
    message: 'iasdnasdnnas as das da sd as afas',
  },
  {
    type: 'yourself',
    message: 'iasdnasdnnas as das da sd as afas',
  },
  {
    type: 'yourself',
    message: 'iasdnasdnnas as das da sd as afas',
  },
  {
    type: 'bot',
    message: 'iasdnasdnnas as das da sd as afas',
  },
  {
    type: 'yourself',
    message: 'iasdnasdnnas as das da sd as afas',
  },
  {
    type: 'bot',
    message: 'iasdnasdnnas as das da sd as afas',
  },
  {
    type: 'bot',
    message: 'iasdnasdnnas as das da sd as afas',
  },
  {
    type: 'yourself',
    message: 'iasdnasdnnas as das da sd as afas',
  },
  {
    type: 'yourself',
    message: 'iasdnasdnnas as das da sd as afas',
  },
  {
    type: 'bot',
    message: 'iasdnasdnnas as das da sd as afas',
  },
  {
    type: 'yourself',
    message: 'iasdnasdnnas as das da sd as afas',
  },
  {
    type: 'bot',
    message: 'iasdnasdnnas as das da sd as afas',
  },
  {
    type: 'bot',
    message: 'iasdnasdnnas as das da sd as afas',
  },
]

const MessageStyled = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  minWidth: 48,
  maxWidth: 360,
  fontSize: 14,
  color: theme.palette.common.black,
  fontWeight: 400,
}))

export default function ChatSection() {
  const theme = useTheme()
  const methods = useForm({
    defaultValues: {
      message: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ height: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Stack
          sx={{
            height: '100%',
            p: 2,
            overflow: 'auto',
            justifyContent: 'space-between',
          }}
        >
          <Stack sx={{ height: '100%' }} spacing={2}>
            {mockMessageData?.map((it) => {
              const { type, message } = it || {}

              return (
                <Stack>
                  <MessageStyled
                    sx={[
                      type === 'bot'
                        ? {
                            alignSelf: 'flex-start',
                            bgcolor: alpha(theme.palette.grey[500], 0.3),
                          }
                        : {
                            alignSelf: 'flex-end',
                            bgcolor: alpha(theme.palette.primary.main, 0.3),
                          },
                    ]}
                  >
                    {message}
                  </MessageStyled>
                </Stack>
              )
            })}
          </Stack>
        </Stack>

        <Stack
          direction='row'
          alignItems='center'
          justifyContent='center'
          gap={2}
          p={2}
        >
          <RHFTextField name='message' size='small' sx={{ flex: 9 }} />

          <LoadingButton
            variant='contained'
            size='large'
            loading={isSubmitting}
            sx={{ flex: 1 }}
          >
            Send
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  )
}
