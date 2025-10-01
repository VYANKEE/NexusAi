import apiClient from './apiClient.js';

export const signup = (userData) => apiClient.post('/auth/signup', userData);
export const login = (credentials) => apiClient.post('/auth/login', credentials);