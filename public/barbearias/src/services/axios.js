import axios from 'axios'
import { parseCookies } from 'nookies'

export function getAPIClient(ctx) {
  const { ["token"]: token } = parseCookies(ctx)   // Pega o token nos cookies

  const api = axios.create({   // Define A rota da api
    baseURL: "http://localhost:5231/api",
    headers: { Accept: 'application/json',  'X-User-Agent-Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone},
    withCredentials: true
  })
  api.interceptors.request.use(config => {
    return config
  })
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`  // se o token existir passa na header de cada requisição
  }

  return api
}
