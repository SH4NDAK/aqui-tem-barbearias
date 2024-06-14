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

export async function editarAgendamento(payload) {
    try {
        const { data } = await api.patch('agenda/editar', payload);
        return data;
    } catch (error) {

    }

}

export async function listarAgendamentos(id_barbeiro, data, cliente, aprovados) {
    let url = `agenda/listar/${id_barbeiro}`

    // Verifica se há parâmetros opcionais e adiciona à URL conforme necessário
    if (data || cliente || aprovados) {
        url += '?';
        if (data) {
            url += `data=${data}`;
            if (cliente || aprovados) {
                url += '&';
            }
        }
        if (cliente) {
            url += `cliente=${cliente}`;
            if (aprovados) {
                url += '&';
            }
        }
        if (aprovados) {
            url += `aprovados=${aprovados}`;
        }
    }

    try {
        const { data } = await api.get(url)
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }

}

export async function aprovarReprovarAgendamento(agendamento, aprovar) {
    agendamento.aprovado = aprovar;
    const payload = { ...agendamento }
    try {
        const { data } = await api.patch('agenda/aprovacao', payload);
        return data;
    } catch (error) {
        console.error('Erro na aprovação/reprovação do agendamento:', error.response ? error.response.data : error.message);
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
