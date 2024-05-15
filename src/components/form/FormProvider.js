import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { FormProvider as Form } from 'react-hook-form'

import PropTypes from 'prop-types'
import { scrollIntoView } from 'seamless-scroll-polyfill'

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
  methods: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  scrollToFirstError: PropTypes.bool,
  duration: PropTypes.number,
  checkFormChanged: PropTypes.bool,
  setIsFormChanged: PropTypes.bool,
}

const ReactHookFormContext = createContext()

export default function FormProvider({
  children,
  onSubmit,
  methods,
  scrollToFirstError = false,
  duration = 250,
  checkFormChanged = false,
  setIsFormChanged,
}) {
  const [isFormProviderChange, setIsFormProviderChange] = useState(false)
  const {
    formState: { errors },
  } = methods

  const handleScrollToError = useCallback(() => {
    if (!scrollToFirstError) return

    const errorFieldNames = Object.keys(errors)

    if (!errorFieldNames.length) return

    const fieldName = errorFieldNames[0]
    const scrollElement = document.querySelector(`[name='${fieldName}']`)

    if (!scrollElement) return

    scrollIntoView(
      scrollElement,
      {
        behavior: 'smooth',
        block: 'center',
      },
      {
        duration,
      }
    )
  }, [duration, errors, scrollToFirstError])

  useEffect(() => {
    handleScrollToError()
  }, [handleScrollToError])

  useEffect(() => {
    if (checkFormChanged && isFormProviderChange) setIsFormChanged?.(true)

    return () => {
      setIsFormChanged?.(false)
    }
  }, [checkFormChanged, isFormProviderChange, setIsFormChanged])

  return (
    <Form {...methods}>
      <ReactHookFormContext.Provider
        value={{
          isFormProviderChange,
          setIsFormProviderChange,
          checkFormChanged,
        }}
      >
        <form onSubmit={onSubmit}>{children}</form>
      </ReactHookFormContext.Provider>
    </Form>
  )
}

export const useReactHookForm = () => {
  const context = useContext(ReactHookFormContext)

  if (!context)
    throw new Error('ReactHookForm context must be use inside FormProvider')

  return context
}
