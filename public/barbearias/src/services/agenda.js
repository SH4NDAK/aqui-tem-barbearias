import api from './api'


export async function saveAgenda(  // Cria rota de criação de agendamento
  payload
){
  const { data } = await api.post('agenda/cadastrar', payload) 
  return data
}

export async function listAgenda() {   // Cria rota de listagem de agenda
  const { data } = await api.get('agenda/listar')
  return data
}

export async function editAgenda(id, payload) { // Criar rota de edição de agenda
  const { data } = await api.put(`/agenda/editar/${id}`, payload)
  return data
}
