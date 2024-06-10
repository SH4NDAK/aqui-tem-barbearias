import { setCookie } from 'nookies'
import api from './api'

export async function searchBarbearia(codigo) {
    const { data } = await api.get(`Barbearia/listar/${codigo}`)
    return data
}
