import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

// Request interceptor - Add token to every request
apiClient.interceptors.request.use(
  (config) => {
    // Skip auth check for public routes
    if (config.url.includes('/auth/login') || 
        config.url.includes('/auth/register') ||
        config.url.includes('/health')) {
      return config;
    }

    const token = sessionStorage.getItem('ssfinworld_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // If no token, don't add auth header
      console.warn('No token found for request:', config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle 401 errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // 401 Unauthorized - Token expired or invalid
      if (error.response.status === 401) {
        console.warn('401 Unauthorized - Clearing session');
        
        // Clear session data
        sessionStorage.removeItem('ssfinworld_token');
        sessionStorage.removeItem('ssfinworld_admin');
        sessionStorage.removeItem('ssfinworld_user');
        
        // Only redirect if not already on login page
        if (!window.location.pathname.includes('/login')) {
          // Show toast message if available
          if (window.showToast) {
            window.showToast('Session expired. Please login again.', 'error');
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (username, password) => apiClient.post('/auth/login', { username, password }),
  register: (userData) => apiClient.post('/auth/register', userData),
  verify: () => apiClient.get('/auth/verify'),
  getUsers: () => apiClient.get('/auth/users'),
  updateUser: (id, data) => apiClient.put(`/auth/users/${id}`, data),
  deleteUser: (id) => apiClient.delete(`/auth/users/${id}`),
};

// Car APIs
export const carAPI = {
  getAll: () => apiClient.get('/cars'),
  getById: (id) => apiClient.get(`/cars/${id}`),
  create: (data) => apiClient.post('/cars', data),
  update: (id, data) => apiClient.put(`/cars/${id}`, data),
  delete: (id) => apiClient.delete(`/cars/${id}`),
};

export default apiClient;