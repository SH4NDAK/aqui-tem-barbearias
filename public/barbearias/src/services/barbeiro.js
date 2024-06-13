import api from "./api";

export async function listByCargo(cargo, nome) {
    try {
        let url = `usuario/listar/${cargo}`;

        if (nome) {
            url += `?nome=${encodeURIComponent(nome)}`
        }

        const { data } = await api.get(url);
        return data;
    } catch (error) {
        console.error('Erro ao listar barbeiros:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function getServicos(id_barbeiro) {
    try {
        const { data } = await api.get(`Servico/listar/${id_barbeiro}`)
        return data
    } catch (error) {

        console.error('Erro ao listar barbeiros:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Barbeiros que trabalham com x tipo-serviço
export async function listByServico(id_tipo_servico) {
    try {
        const { data } = await api.get(`usuario/listarServico/${id_tipo_servico}`);
        return data;
        
    } catch (error) {
        console.error('Erro ao listar barbeiros:', error.response ? error.response.data : error.message);
        throw error;
    }

}
