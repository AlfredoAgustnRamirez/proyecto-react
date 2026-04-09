import React, { createContext, useState, useContext, useEffect } from 'react';
import { getProducts } from '../services/api';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe usarse dentro de ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProductos(response.data);
      setError(null);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const categorias = ['todos', ...new Set(productos.map(p => p.categoria))];

  return (
    <ProductContext.Provider value={{
      productos,
      loading,
      error,
      categorias,
      cargarProductos
    }}>
      {children}
    </ProductContext.Provider>
  );
};