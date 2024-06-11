import { setCookie } from 'nookies'
import api from './api'
import { isAxiosError } from 'axios';
import { notification } from 'antd';

export async function searchBarbearia(codigo, user) {
    const { data } = await api.get(`Barbearia/listar/${codigo}?user=${user.id}`)
    return data
}

export async function searchByCliente(user) {
    const { data } = await api.get(`BarbeariaUsuario/listar/${user.id}`);
    return data;
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
        if (!isAxiosError(e)) return;

        const { codigo, mensagem } = e.response.data

        if (codigo === 403) {
            notification.error({
                message: mensagem
            })
        }
    }
}


export async function unklinkClienteBarbearia(id_usuario, id_barbearia) {
    console.log(id_usuario);
    console.log(id_barbearia);
    let url = `BarbeariaUsuario/desvincular?user=${id_usuario}&barbearia=${id_barbearia}`;
    try {
        const { data } = await api.delete(url);
        return data;
    } catch (e) {
        if (!isAxiosError(e)) return;

        notification.error({
            message: "Ocorreu um erro ao desvincular o cliente da barbearia"
        })
    }
}


