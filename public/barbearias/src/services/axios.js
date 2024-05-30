import axios from 'axios';
import { parseCookies } from 'nookies';

export function getAPIClient(ctx) {
  const { ["token"]: token } = parseCookies(ctx); // Pega o token nos cookies
  console.log(token)
  const api = axios.create({
    baseURL: "http://localhost:5028/api",
    headers: { Accept: 'application/json' }
  });

  // Interceptador de resposta para capturar erros
  // api.interceptors.response.use(
  //   response => {
  //     // Tratamento de resposta bem-sucedida
  //     if (response.status === 200) {
  //       console.log('Requisição bem-sucedida:', response.data);
  //     }
  //     return response; // Retorna a resposta se não houver erro
  //   }
  // );

  if (token) {
    api.defaults.headers['Authorization'] = 'Bearer ${token}'; // se o token existir, passa na header de cada requisição
  }

  return api;
}
