import { setCookie } from 'nookies'

import api from './api'


export async function signInRequest(  // Cria rota de login com retorno de data
  signInData
){
  const { data } = await api.post('auth/login', signInData) 
  return data
}

export async function signUpRequest(signUpData) {   // Cria rota de registro com retorno de data
  
  const { data } = await api.post('auth/register', signUpData)
  return data
}

export function SetAuthenticationToken(token) {  // Define o token nos Cookies
  api.defaults.headers['Authorization'] = `Bearer ${token}`
  setCookie(undefined, "token", token, {
    path: '/',
    maxAge: 300
  })
}
export function SetAuthenticationUser(user) {  // Define o usuario na Aplicação
  return localStorage.setItem('usuario', JSON.stringify(user));
}

export function setLogoutUser() {
  return localStorage.removeItem('usuario') // remove o usuario na aplications
}

export async function editUser(id, payload) {
  const { data } = await api.put(`auth/editarUsuario/${id}`, payload)
  return data
}