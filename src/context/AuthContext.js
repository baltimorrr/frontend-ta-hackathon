import { createContext, useEffect, useReducer } from 'react'

import PropTypes from 'prop-types'
import {
  checkIsValidAccessToken,
  setRefreshToken,
  setRememberMe,
  setSession,
} from 'utils/jwt'
import { _postApi } from 'utils/axios'

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
}

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    }
  },
  LOGIN: (state, action) => {
    const { user } = action.payload

    return {
      ...state,
      isAuthenticated: true,
      user,
    }
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
}

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state

export const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
})

AuthProvider.propTypes = {
  children: PropTypes.node,
}

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const initialze = async () => {
      try {
        const accessToken =
          typeof window !== 'undefined'
            ? localStorage.getItem('accessToken')
            : ''

        console.log('acc', accessToken, checkIsValidAccessToken(accessToken))
        if (accessToken && checkIsValidAccessToken(accessToken)) {
          setSession(accessToken)

          // api get userinfo
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: {},
            },
          })
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          })
        }
      } catch (err) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })
      }
    }

    initialze()
  }, [])

  const getAccessToken = async (refreshToken = '', remember = false) => {
    if (!refreshToken) return

    const response = await _postApi('api/refreshToken', null, {
      headers: {
        'X-Refresh-Token': refreshToken,
      },
    })
    const accessToken = response?.data?.accessToken || ''

    setRememberMe(remember)
    setRefreshToken(refreshToken)
    setSession(accessToken)

    // api get user info

    dispatch({
      type: 'LOGIN',
      payload: {
        user: {},
      },
    })
  }

  const login = async (username, password, remember) => {
    const { accessToken = {} } = await _postApi('auth/login', {
      username,
      password,
    })
    console.log('accessToken', accessToken)

    setSession(accessToken)
    dispatch({
      type: 'LOGIN',
      payload: {
        user: {},
      },
    })

    // const { refreshToken = '' } = data?.user || {}
    // await getAccessToken(refreshToken, remember)
  }

  const logout = async () => {
    setSession(null)
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        dispatch,
        login,
        logout,
        getAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
