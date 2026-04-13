// src/api.ts
import axios, { AxiosResponse } from 'axios';

export interface Product {
  id?: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  imagen?: string;
  rating?: number;
}

export interface User {
  id: number;
  nombre: string;
  email: string;
  rol?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// ✅ Cambiá la URL según tu backend
const API_URL = 'http://localhost:3000/api';

const API = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logs
API.interceptors.request.use((config) => {
  console.log(`📡 ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Interceptor para agregar token automáticamente
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    console.error('❌ Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// ============================================
// PRODUCTOS
// ============================================
export const getProducts = (): Promise<AxiosResponse<Product[]>> => 
  API.get('/products');

export const getProduct = (id: number): Promise<AxiosResponse<Product>> => 
  API.get(`/products/${id}`);

export const createProduct = (data: Omit<Product, 'id'>): Promise<AxiosResponse<Product>> => 
  API.post('/products', data);

export const updateProduct = (id: number, data: Partial<Product>): Promise<AxiosResponse<Product>> => 
  API.put(`/products/${id}`, data);

export const deleteProduct = (id: number): Promise<AxiosResponse<void>> => 
  API.delete(`/products/${id}`);

// ============================================
// AUTENTICACIÓN
// ============================================
export const login = (email: string, password: string): Promise<AxiosResponse<LoginResponse>> => 
  API.post('/auth/login', { email, password });

export const register = (userData: Omit<User, 'id'> & { password: string }): Promise<AxiosResponse<LoginResponse>> => 
  API.post('/auth/register', userData);

export const logout = (): Promise<AxiosResponse<void>> => 
  API.post('/auth/logout');

export const getCurrentUser = (): Promise<AxiosResponse<User>> => 
  API.get('/auth/me');

export default API;