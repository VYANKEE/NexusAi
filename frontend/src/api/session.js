import apiClient from './apiClient.js';

export const getUserSessions = () => apiClient.get('/sessions');
export const createSession = (data) => apiClient.post('/sessions', data);
export const getSessionById = (sessionId) => apiClient.get(`/sessions/${sessionId}`);
export const sendMessage = (sessionId, content) => apiClient.post(`/sessions/${sessionId}/messages`, { content });
export const updateSessionTitle = (sessionId, title) => apiClient.put(`/sessions/${sessionId}`, { title });
export const deleteSession = (sessionId) => apiClient.delete(`/sessions/${sessionId}`);