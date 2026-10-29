import api from './api';
import { tokenHelper } from '../utils/tokenHelper';

/**
 * Authentication REST Service.
 */
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data?.accessToken) {
      tokenHelper.setToken(response.data.accessToken);
      tokenHelper.setUser(response.data.user);
    }
    return response;
  },

  register: async (userData) => {
    return await api.post('/auth/register', userData);
  },

  getMe: async () => {
    return await api.get('/auth/me');
  },

  logout: () => {
    tokenHelper.clearSession();
  },
};
