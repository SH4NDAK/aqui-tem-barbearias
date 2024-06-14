import api from './api';

export async function saveAgenda(payload) {
    try {
        const { data } = await api.post('agenda/cadastrar', payload);
        return data;
    } catch (error) {
        console.error('Erro ao salvar agenda:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function verificarCliente(nome) {
    try {
        const { data } = await api.get(`agenda/verificar/${nome}`)
        return data;
    } catch (error) {
        console.error('Erro ao verificar situação do cliente:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function cancelarSolicitacao(id) {
    try {
        const { data } = await api.delete(`agenda/cancelar/${id}`)
        return data;
    } catch (error) {
        console.error('Erro ao cancelar o agendamento do cliente:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function listAgenda(id_barbeiro) {
    try {
        const { data } = await api.get(`agenda/listar/${id_barbeiro}`);
        return data;
    } catch (error) {
        console.error('Erro ao listar agenda:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function editAgenda(id, payload) {
    try {
        const { data } = await api.put(`/agenda/editar/${id}`, payload);
        return data;
    } catch (error) {
        console.error('Erro ao editar agenda:', error.response ? error.response.data : error.message);
        throw error;
    }
}
