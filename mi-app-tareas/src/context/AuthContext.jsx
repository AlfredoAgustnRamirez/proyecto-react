import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUsuario(JSON.parse(userData));
      } catch (e) {
        console.error('Error al parsear usuario:', e);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin@test.com' && password === '123456') {
      const user = { id: 1, nombre: 'Administrador', email, rol: 'admin' };
      const token = 'fake-token-' + Date.now();
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUsuario(user);
      setLoading(false);
      return { success: true };
    }
    
    if (email === 'user@test.com' && password === '123456') {
      const user = { id: 2, nombre: 'Usuario Normal', email, rol: 'user' };
      const token = 'fake-token-' + Date.now();
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUsuario(user);
      setLoading(false);
      return { success: true };
    }
    
    setError('Credenciales inválidas');
    setLoading(false);
    return { success: false };
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = {
      id: Date.now(),
      nombre: userData.nombre,
      email: userData.email,
      rol: 'user'
    };
    const token = 'fake-token-' + Date.now();
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(newUser));
    setUsuario(newUser);
    setLoading(false);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUsuario(null);
  };

  const value = {
    usuario,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!usuario
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};