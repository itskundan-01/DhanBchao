import api from './api';

export const updateProfile = async (userData) => {
  const response = await api.put('/users/profile', userData);
  return response.data;
};

export const updatePassword = async (passwordData) => {
  const response = await api.put('/users/password', passwordData);
  return response.data;
};

export const getWatchlist = async () => {
  const response = await api.get('/users/watchlist');
  return response.data;
};

export const addToWatchlist = async (productId) => {
  const response = await api.post('/users/watchlist', { productId });
  return response.data;
};

export const removeFromWatchlist = async (productId) => {
  const response = await api.delete(`/users/watchlist/${productId}`);
  return response.data;
};

export const getBrowsingHistory = async () => {
  const response = await api.get('/users/history');
  return response.data;
};

export const addToBrowsingHistory = async (productId) => {
  const response = await api.post('/users/history', { productId });
  return response.data;
};

export const clearBrowsingHistory = async () => {
  const response = await api.delete('/users/history');
  return response.data;
};

export const getNotifications = async () => {
  const response = await api.get('/users/notifications');
  return response.data;
};

export const markNotificationAsRead = async (notificationId) => {
  const response = await api.put(`/users/notifications/${notificationId}`);
  return response.data;
};
