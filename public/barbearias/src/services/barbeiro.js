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