// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://donatehub-system-5.onrender.com';const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Admin API endpoints
export const adminAPI = {
  login: (credentials) => api.post('/admin/auth/login', credentials),
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  getUsers: (params) => api.get('/admin/users', { params }),
  getNGOs: (params) => api.get('/admin/ngos', { params }),
  getDonations: (params) => api.get('/admin/donations', { params }),
  getRequests: (params) => api.get('/admin/requests', { params }),
  updateStatus: (entity, id, status) => api.patch(`/admin/${entity}/${id}/status`, { status }),
  // Add more endpoints as needed
};