/**
 * Token and LocalStorage utility helpers.
 */

const TOKEN_KEY = 'careerconnect_token';
const USER_KEY = 'careerconnect_user';

export const tokenHelper = {
  getToken: () => localStorage.getItem(TOKEN_KEY),

  setToken: (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  getUser: () => {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  setUser: (user) => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  removeUser: () => {
    localStorage.removeItem(USER_KEY);
  },

  clearSession: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  isAuthenticated: () => {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  },
};
