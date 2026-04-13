import React, { createContext, useState, useContext, useEffect } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      try {
        setCarrito(JSON.parse(carritoGuardado));
      } catch (e) {
        console.error('Error al cargar carrito:', e);
      }
    }
  }, []);

  useEffect(() => {
    const nuevoTotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const nuevaCantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    setTotal(nuevoTotal);
    setTotalItems(nuevaCantidad);
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    console.log('agregarAlCarrito llamado:', producto, cantidad); // Debug
    
    setCarrito(prevCarrito => {
      const existe = prevCarrito.find(item => item.id === producto.id);
      
      if (existe) {
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== id));
  };

  const updateCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      removeFromCart(id);
      return;
    }
    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const clearCart = () => {
    setCarrito([]);
  };

  const value = {
    carrito,
    total,
    totalItems,
    agregarAlCarrito,
    removeFromCart,
    updateCantidad,
    clearCart
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
  }
  return context;
};