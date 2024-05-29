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

export async function listAgenda() {
    try {
        const { data } = await api.get('agenda/listar');
        console.log('Resposta da listagem de agenda:', data);
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
