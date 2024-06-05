import api from "./api";

export async function listByCargo(cargo) {
    try {
        const { data } = await api.get(`usuario/listar/${cargo}`);
        return data;
    } catch (error) {
        console.error('Erro ao listar barbeiros:', error.response ? error.response.data : error.message);
        throw error;
    }
}