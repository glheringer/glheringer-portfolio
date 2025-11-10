import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erro da API (4xx, 5xx)
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Sem resposta do servidor
      return Promise.reject({
        success: false,
        error: 'Não foi possível conectar ao servidor. Verifique sua conexão.',
      });
    } else {
      // Erro na configuração da requisição
      return Promise.reject({
        success: false,
        error: 'Erro ao processar requisição.',
      });
    }
  }
);
