import axios from 'axios';
import { tokenHelper } from '../utils/tokenHelper';

/**
 * Centralized Axios REST client instance configured with interceptors.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request Interceptor: Attach JWT Bearer token
api.interceptors.request.use(
  (config) => {
    const token = tokenHelper.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle global response formatting & 401 Unauthorized
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      tokenHelper.clearSession();
      // Optional redirect to login if not already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login?expired=true';
      }
    }
    return Promise.reject(error.response?.data || error);
  }
);

export default api;
