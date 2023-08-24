// Este é um arquivo que configura uma instância do Axios para fazer chamadas HTTP à API do seu aplicativo. Ele também inclui um interceptor de solicitação que adiciona o token de autenticação aos cabeçalhos de todas as solicitações feitas usando essa instância do Axios. 


import axios from 'axios';
import store from '../store';

// Isso cria uma instância do Axios com uma URL base fornecida (baseURL). Isso é útil para evitar repetir a mesma URL base em todas as chamadas.
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api/'
});

// Isso define um interceptor de solicitação que é executado antes de cada solicitação ser enviada. Ele pega a configuração da solicitação (que inclui o URL, cabeçalhos, etc.) e adiciona o token de autenticação aos cabeçalhos, se estiver disponível.
api.interceptors.request.use((config) => {
  // acessa o estado do Redux para obter informações de autenticação, como o token.
  const { token } = store.getState().auth;

  const headers = { ...config.headers };

  if (token) {
    // adicionado aos cabeçalhos da solicitação para incluir o token de autenticação usando o esquema Bearer.
    headers.Authorization = `Bearer ${token}`;
  }

  return { ...config, headers };
});

export default api;

// O interceptor de solicitação é uma ótima maneira de adicionar automaticamente informações aos cabeçalhos de todas as solicitações. Nesse caso, ele é usado para garantir que todas as solicitações tenham o token de autenticação necessário, caso o usuário esteja autenticado. Isso é especialmente útil em aplicativos que requerem autenticação para acessar as rotas da API.