import api from './api';

/**
 * Jobs and Public API Services.
 */
export const jobService = {
  checkApiHealth: async () => {
    return await api.get('/health');
  },

  getJobs: async (params = {}) => {
    return await api.get('/jobs', { params });
  },

  getJobById: async (id) => {
    return await api.get(`/jobs/${id}`);
  },
};
