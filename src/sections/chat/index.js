import { LoadingButton } from '@mui/lab'
import {
  Card,
  Stack,
  Typography,
  alpha,
  useTheme,
  styled,
  Button,
  LinearProgress,
} from '@mui/material'
import Loading from 'components/Loading'
import FormProvider from 'components/form/FormProvider'
import RHFBasicSelect from 'components/form/RHFBasicSelect'
import RHFTextField from 'components/form/RHFTextField'
import { useSnackbar } from 'notistack'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AI_MODEL_OPTIONS } from 'sections/chart/config'
import { _getApi, _postApi } from 'utils/axios'
import BounceMessageComponent from '../../components/bounce-message/BounceMessageComponent'

const MessageStyled = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(3),
  minWidth: 48,
  maxWidth: 600,
  fontSize: 14,
  color: theme.palette.common.black,
  fontWeight: 400,
  whiteSpace: 'break-spaces',
}))

export default function ChatSection() {
  const theme = useTheme()
  const [isLoadingConversationData, setIsLoadingConversationData] =
    useState(false)
  const [isSubmittingNewConversation, setIsSubmittingNewConversation] =
    useState(false)
  const [conversationData, setConversationData] = useState([])
  const [isLoadingNewMessage, setIsLoadingNewMessage] = useState(false);
  const chatRef = useRef(null)
  const { enqueueSnackbar } = useSnackbar()

  const fetchConversationData = useCallback(async () => {
    try {
      setIsLoadingConversationData(true)
      const response = await _getApi('chat/currentThread/new')
      setConversationData(response)
      setIsLoadingConversationData(false)
    } catch (error) {
      setIsLoadingConversationData(false)
      enqueueSnackbar(
        error?.message || 'Something went wrong! Please try again',
        { variant: 'error' }
      )
    }
  }, [enqueueSnackbar])

  const methods = useForm({
    defaultValues: {
      message: '',
      model: AI_MODEL_OPTIONS[0],
    },
  })

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data) => {
    try {
      setConversationData((prev) =>
        prev.concat({
          id: prev?.length,
          role: 'user',
          content: data?.message,
        })
      )
      setValue('message', '')
      setIsLoadingNewMessage(true)
      await _postApi('chat/message', data)
      setIsLoadingNewMessage(false)
      const conversationResponseData = await _getApi('chat/currentThread/new')
      setConversationData(conversationResponseData)
    } catch (error) {
      enqueueSnackbar(
        error?.message || 'Something went wrong! Please try again',
        { variant: 'error' }
      )
    }
  }

  const handleCreateNewConversation = async () => {
    try {
      setIsSubmittingNewConversation(true)
      await _postApi('chat/thread/new')
      const conversationResponseData = await _getApi('chat/currentThread/new')
      setIsSubmittingNewConversation(false)
      setConversationData(conversationResponseData)
    } catch (error) {
      setIsSubmittingNewConversation(false)
      enqueueSnackbar(
        error?.message || 'Something went wrong! Please try again',
        { variant: 'error' }
      )
    }
  }

  useEffect(() => {
    if (!chatRef?.current) return

    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [conversationData])

  useEffect(() => {
    if (isLoadingNewMessage) {
      setConversationData((prev) =>
        prev.concat({
          id: prev?.length,
          role: 'assistant',
          content: null,
        })
      )

      console.log('Huy data: ', conversationData)
    }
  }, [isLoadingNewMessage])

  useEffect(() => {
    fetchConversationData()
  }, [fetchConversationData])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ width: '100%', mb: 2 }}
      >
        <RHFBasicSelect
          label='Model'
          name='model'
          options={AI_MODEL_OPTIONS}
          size='small'
          sx={{ width: 240 }}
        />

        <Button variant='contained' onClick={handleCreateNewConversation}>
          New Conversation
        </Button>
      </Stack>

      <Card
        sx={{
          height: 'calc(100% - 80px)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack
          sx={{
            height: '100%',
            p: 2,
            overflow: 'auto',
            justifyContent: 'space-between',
          }}
        >
          {(() => {
            if (isLoadingConversationData || isSubmittingNewConversation)
              return (
                <Loading
                  sx={{
                    height: '80vh',
                    width: '100%',
                  }}
                />
              )

            return (
              <Stack sx={{ height: '100%' }} spacing={2} ref={chatRef}>
                {conversationData?.map((it, idx) => {
                  const { role, content, id } = it || {}

                  return (
                    <Stack
                      key={id}
                      ref={
                        idx === conversationData?.length - 1 ? chatRef : null
                      }
                    >
                      <MessageStyled
                        sx={[
                          role === 'assistant'
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
                        {
                          content ? (
                            <div dangerouslySetInnerHTML={{ __html: content }}>
                            </div>
                          ) : (
                            <BounceMessageComponent />
                          )
                        }
                      </MessageStyled>
                    </Stack>
                  )
                })}
              </Stack>
            )
          })()}
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
            type='submit'
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
