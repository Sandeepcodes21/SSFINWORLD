import axios from 'axios';

// ============================================
// API URL - Dynamic for Netlify + Vercel
// ============================================
const getApiUrl = () => {
  // Production (Netlify)
  if (import.meta.env.PROD) {
    return 'https://ssfinworld-backend.vercel.app/api';
  }
  // Development
  return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
};

const API_URL = getApiUrl();

console.log('✅ API URL:', API_URL);

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('ssfinworld_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('ssfinworld_token');
      sessionStorage.removeItem('ssfinworld_admin');
      sessionStorage.removeItem('ssfinworld_user');
      if (window.location.pathname !== '/') {
        window.location.href = '/';
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
};

// Car APIs
export const carAPI = {
  getAll: () => apiClient.get('/cars'),
  getById: (id) => apiClient.get(`/cars/${id}`),
  create: (data) => apiClient.post('/cars', data),
  update: (id, data) => apiClient.put(`/cars/${id}`, data),
  delete: (id) => apiClient.delete(`/cars/${id}`),
  deleteImage: (id, imageIndex) => apiClient.delete(`/cars/${id}/image/${imageIndex}`),
};

export default apiClient;