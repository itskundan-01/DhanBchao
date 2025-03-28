import api from './api';

export const getProducts = async (page = 1, limit = 10, category = '', brand = '') => {
  const response = await api.get('/products', {
    params: { page, limit, category, brand }
  });
  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const searchProducts = async (query) => {
  const response = await api.get('/products/search', {
    params: { q: query }
  });
  return response.data;
};

export const compareProducts = async (productIds) => {
  const ids = Array.isArray(productIds) ? productIds.join(',') : productIds;
  const response = await api.get('/products/compare', {
    params: { ids }
  });
  return response.data;
};
