import jwtDecode from 'jwt-decode'

import { API_REFRESH_TOKEN } from 'routes/api'

import axios, { _postApi } from './axios'

export const checkIsValidAccessToken = (accessToken) => {
  if (!accessToken) return false

  const decoded = jwtDecode(accessToken)
  const currentTime = Date.now() / 1000

  return decoded?.exp > currentTime // lon hon co nghia la ngay lon hon 28 > 25
}

export const handleAccessTokenExpired = (exp) => {
  let expiredTimer

  const currentTime = Date.now()

  const timeLeft = exp * 1000 - currentTime

  clearTimeout(expiredTimer)

  expiredTimer = setTimeout(() => {
    handleRefreshToken()
  }, timeLeft)
}

export const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`

    const { exp } = jwtDecode(accessToken)
    // handleAccessTokenExpired(exp)
  } else {
    localStorage.removeItem('accessToken')
    delete axios.defaults.headers.common.Authorization
  }
}

export const setRememberMe = (rememberMe) => {
  if (typeof rememberMe === 'boolean') {
    localStorage.setItem('isRememberMe', rememberMe)
  } else {
    localStorage.removeItem('isRememberMe')
  }
}

export const setRefreshToken = (refreshToken) => {
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken)
  } else {
    localStorage.removeItem('refreshToken')
  }
}

export const setIsFirstLogin = (isFirstLogin) => {
  if (typeof isFirstLogin === 'boolean') {
    localStorage.setItem('isFirstLogin', isFirstLogin)
  } else {
    localStorage.removeItem('isFirstLogin')
  }
}

export const handleRefreshToken = async () => {
  try {
    const isRememberMe = JSON.parse(localStorage.getItem('isRememberMe'))

    if (!isRememberMe) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      window.location.href = '/login'
      return
    }

    const refreshToken = localStorage.getItem('refreshToken')
    const { data: { accessToken = '' } = {} } = await _postApi(
      API_REFRESH_TOKEN,
      null,
      {
        headers: {
          'X-Refresh-Token': refreshToken,
        },
      }
    )

    setSession(accessToken)
    window.location.reload()
  } catch (err) {
    console.log(err)
  }
}
