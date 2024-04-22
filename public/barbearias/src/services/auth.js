import { setCookie } from 'nookies'

import api from './api'


export async function signInRequest(
  signInData
){
  const { data } = await api.post('auth/login', signInData)
  return data
}

export async function signUpRequest(signUpData) {
  const { data } = await api.post('auth/register', signUpData)
  return data
}

export function SetAuthenticationToken(token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`
  setCookie(undefined, "token", token, {
    path: '/',
    maxAge: 300
  })
}
