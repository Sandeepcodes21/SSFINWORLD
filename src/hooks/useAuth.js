import { useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check session on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = sessionStorage.getItem('ssfinworld_token');
    
    if (!token) {
      setLoading(false);
      setIsAdmin(false);
      setUser(null);
      return;
    }

    try {
      const response = await authAPI.verify();
      if (response.data.success) {
        setIsAdmin(true);
        setUser(response.data.user);
        // Store user in session
        sessionStorage.setItem('ssfinworld_user', JSON.stringify(response.data.user));
        sessionStorage.setItem('ssfinworld_admin', 'true');
      } else {
        // Token invalid
        clearSession();
      }
    } catch (error) {
      console.error('Auth check error:', error);
      // Only clear session if it's a 401 or 403 error
      if (error.response?.status === 401 || error.response?.status === 403) {
        clearSession();
      }
      // For network errors, keep existing session
    } finally {
      setLoading(false);
    }
  };

  const clearSession = () => {
    sessionStorage.removeItem('ssfinworld_token');
    sessionStorage.removeItem('ssfinworld_admin');
    sessionStorage.removeItem('ssfinworld_user');
    setIsAdmin(false);
    setUser(null);
  };

  const login = async (username, password) => {
    try {
      const response = await authAPI.login(username, password);
      if (response.data.success) {
        sessionStorage.setItem('ssfinworld_token', response.data.token);
        sessionStorage.setItem('ssfinworld_admin', 'true');
        sessionStorage.setItem('ssfinworld_user', JSON.stringify(response.data.user));
        setIsAdmin(true);
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      }
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed. Please try again.' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      if (response.data.success) {
        sessionStorage.setItem('ssfinworld_token', response.data.token);
        sessionStorage.setItem('ssfinworld_admin', 'true');
        sessionStorage.setItem('ssfinworld_user', JSON.stringify(response.data.user));
        setIsAdmin(true);
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      }
      return { success: false, error: 'Registration failed' };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed. Please try again.' 
      };
    }
  };

  const logout = () => {
    clearSession();
  };

  return { 
    isAdmin, 
    loading, 
    user, 
    login, 
    register, 
    logout,
    checkAuth
  };
}