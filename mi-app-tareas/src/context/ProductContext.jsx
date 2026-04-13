import React, { createContext, useState, useContext } from 'react';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../api/config"; 

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts(); 
      setProducts(response.data); 
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product) => {
    try {
      const response = await createProduct(product);
      const newProduct = response.data; 
      setProducts([...products, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    }
  };

  const editProduct = async (id, product) => {
    try {
      const response = await updateProduct(id, product);
      const updatedProduct = response.data; 
      setProducts(products.map(p => p.id === id ? updatedProduct : p));
      return updatedProduct;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    }
  };

  const removeProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    }
  };

  const value = {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    editProduct,
    removeProduct
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe usarse dentro de un ProductProvider');
  }
  return context;
};