import api from './api'

export async function listService() {   // Cria rota de listagem de agenda
    const { data } = await api.get('Servico/ListarServico')
    return data
}

export async function createService(payload) {
    const { data } = await api.post('Servico/cadastrar', payload)
    return data
}

export async function editService(id, payload) {
    const { data } = await api.put(`Servico/editar/${id}`, payload)
    return data
}

export async function takeUniqueService(id) {
    const { data } = await api.get(`Servico/ListarUnicoServico/${id}`)
    return data
}

export async function linkServicoBarbeiro(id_tipo_servico, id_barbeiro) {
    const payload = {
        id_tipo_servico,
        id_barbeiro
    }

    const { data } = await api.post(`ServicoUsuario/vincular`, payload);
    return data;
}

export async function unlinkServicoBarbeiro(id_barbeiro, id_tipo_servico) {
    const { data } = await api.delete(`ServicoUsuario/desvincular?barbeiro=${id_barbeiro}&tipo_servico=${id_tipo_servico}`);
    return data;
}