import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

// Auth
export const register = (userData) => API.post('/auth/register', userData);
export const login = (userData) => API.post('/auth/login', userData);

// Products
export const getProducts = () => API.get('/products');
export const getProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (productData) => API.post('/products', productData);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Cart
export const getCart = () => API.get('/cart');
export const addToCart = (producto, cantidad) => API.post('/cart', { producto, cantidad });
export const updateCartItem = (id, cantidad) => API.put(`/cart/${id}`, { cantidad });
export const removeFromCart = (id) => API.delete(`/cart/${id}`);
export const clearCart = () => API.delete('/cart');

export default API;