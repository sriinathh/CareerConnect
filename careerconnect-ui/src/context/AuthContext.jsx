import { useState, useEffect } from 'react';
import { AuthContext } from './authContextDef';
import { tokenHelper } from '../utils/tokenHelper';
import { authService } from '../services/authService';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => tokenHelper.getUser());
  const [token, setToken] = useState(() => tokenHelper.getToken());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If token exists, sync user info
    if (token && !user) {
      setUser(tokenHelper.getUser());
    }
  }, [token, user]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await authService.login(credentials);
      setUser(res.data?.user || null);
      setToken(res.data?.accessToken || null);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      return await authService.register(userData);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  const hasRole = (role) => {
    return user?.roles?.includes(role) || user?.roles?.includes(`ROLE_${role}`);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(token),
    login,
    register,
    logout,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
