import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cookieManager } from '@/lib/cookies';
import type { User } from '@/api/auth/types';

export function useAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth on mount
    const userData = cookieManager.getUser();
    setUser(userData);
    setIsLoading(false);
  }, []);

  const login = (token: string, userData: User, refreshToken?: string) => {
    cookieManager.setToken(token);
    cookieManager.setUser(userData);
    if (refreshToken) {
      cookieManager.setRefreshToken(refreshToken);
    }
    setUser(userData);
  };

  const logout = () => {
    cookieManager.clearAuth();
    setUser(null);
    navigate('/login');
  };

  const isAuthenticated = () => {
    return cookieManager.isAuthenticated();
  };

  const hasPermission = (permission: string) => {
    if (!user) return false;
    return user.permissions.includes(permission) || user.permissions.includes('admin');
  };

  const hasRole = (role: string) => {
    if (!user) return false;
    return user.role === role || user.role === 'admin';
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      cookieManager.setUser(updatedUser);
    }
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated,
    hasPermission,
    hasRole,
    updateUser,
  };
}