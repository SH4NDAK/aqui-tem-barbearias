import { setCookie } from 'nookies'
import api from './api'

export async function searchBarbearia(codigo, user) {
    const { data } = await api.get(`Barbearia/listar/${codigo}?user=${user.id}`)
    return data
}

export async function linkClienteBarbearia(id_usuario, id_barbearia) {
    try {
        let url = `BarbeariaUsuario/vincular`;
        const payload = {
            IdUsuario: id_usuario,
            IdBarbearia: id_barbearia
        };
        const { data } = await api.post(url, payload);
        return data;
    } catch (e) {
        console.log(e);
    }
}
