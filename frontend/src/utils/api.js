import axios from 'axios';
import { getApiUrl } from './config';

// Criar instância do axios com a URL base da API
const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funções de API para produtos
export const getProdutos = async (categoria = null) => {
  try {
    const params = categoria && categoria !== 'todas' ? { categoria } : {};
    const response = await api.get('/produtos', { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao obter produtos:', error);
    throw error;
  }
};

export const getProdutoPorId = async (id) => {
  try {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao obter produto com ID ${id}:`, error);
    throw error;
  }
};

export const getCategorias = async () => {
  try {
    const response = await api.get('/produtos/categorias');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter categorias:', error);
    throw error;
  }
};

// Funções de API para pagamentos
export const criarCheckout = async (produtoId) => {
  try {
    const response = await api.post('/pagamentos/checkout', { produtoId });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar checkout:', error);
    throw error;
  }
};

export default api;