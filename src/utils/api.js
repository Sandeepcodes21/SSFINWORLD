import axios from 'axios';

const getApiUrl = () => {
  if (import.meta.env.PROD) {
    return 'https://ssfin-backend.vercel.app/';
  }
  return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
};

const API_URL = getApiUrl();

console.log('✅ API URL:', API_URL);

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 30000,
  withCredentials: true // Important for CORS
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
    console.error('API Error:', error.message);
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