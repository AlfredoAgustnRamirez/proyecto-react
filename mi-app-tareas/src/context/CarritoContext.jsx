import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../services/api';

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrecio, setTotalPrecio] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      const response = await getCart();
      setCarrito(response.data);
    } catch (error) {
      console.error('Error al cargar carrito:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    const items = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const precio = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    setTotalItems(items);
    setTotalPrecio(precio);
  }, [carrito]);

  const agregarAlCarrito = async (producto, cantidad = 1) => {
    try {
      const response = await addToCart(producto, cantidad);
      setCarrito(response.data);
    } catch (error) {
      console.error('Error al agregar:', error);
    }
  };

  const eliminarDelCarrito = async (id) => {
    try {
      const response = await removeFromCart(id);
      setCarrito(response.data);
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const actualizarCantidad = async (id, nuevaCantidad) => {
    try {
      const response = await updateCartItem(id, nuevaCantidad);
      setCarrito(response.data);
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  const vaciarCarrito = async () => {
    try {
      await clearCart();
      setCarrito([]);
    } catch (error) {
      console.error('Error al vaciar:', error);
    }
  };

  return (
    <CarritoContext.Provider value={{
      carrito,
      totalItems,
      totalPrecio,
      loading,
      agregarAlCarrito,
      eliminarDelCarrito,
      actualizarCantidad,
      vaciarCarrito,
      loadCart
    }}>
      {children}
    </CarritoContext.Provider>
  );
};