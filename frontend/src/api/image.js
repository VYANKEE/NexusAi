import apiClient from './apiClient.js';

export const generateImage = (prompt) => {
  return apiClient.post('/image/generate', { prompt });
};