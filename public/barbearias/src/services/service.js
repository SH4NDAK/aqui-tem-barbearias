import api from './api'

export async function listService() {   // Cria rota de listagem de agenda
    const { data } = await api.get('Servico/ListarServico')
    return data
}

