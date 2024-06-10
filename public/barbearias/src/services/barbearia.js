import { setCookie } from 'nookies'
import api from './api'

export async function searchBarbearia(codigo) {
    const { data } = await api.post('barbearia/auth', codigo)
    return data
}
