import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

// @TODO Criar um serviço generico para o axios

export default api;
