import apiClient from './apiClient.js';

/**
 * Creates a new video generation job by sending a prompt to the backend.
 * @param {string} prompt The text prompt for the video.
 * @returns {Promise} An Axios promise that resolves with the new job details.
 */
export const createVideoJob = (prompt) => {
  return apiClient.post('/video/jobs', { prompt });
};

/**
 * Gets all video generation jobs for the current user.
 * @returns {Promise} An Axios promise that resolves with an array of video jobs.
 */
export const getVideoJobs = () => {
  return apiClient.get('/video/jobs');
};