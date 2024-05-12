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
