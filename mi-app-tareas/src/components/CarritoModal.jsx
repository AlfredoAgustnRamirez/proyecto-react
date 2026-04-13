import React from 'react';
import { useCarrito } from '../context/CarritoContext';

const CarritoModal = ({ onClose }) => {
  const { carrito, total, totalItems, removeFromCart, updateCantidad, clearCart } = useCarrito();

  console.log('CarritoModal renderizado', { carrito, total, totalItems });

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Función segura para formatear precio
  const formatPrecio = (precio) => {
    const numero = Number(precio);
    return isNaN(numero) ? '0.00' : numero.toFixed(2);
  };

  // Función segura para calcular subtotal
  const calcularSubtotal = (item) => {
    const precio = Number(item.precio) || 0;
    const cantidad = Number(item.cantidad) || 0;
    return (precio * cantidad).toFixed(2);
  };

  if (!carrito || carrito.length === 0) {
    return (
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>🛒 Tu Carrito</h2>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
          <div className="empty-cart">
            <p>Tu carrito está vacío</p>
            <button onClick={onClose} className="continue-btn">Seguir Comprando</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content carrito-modal">
        <div className="modal-header">
          <h2>🛒 Tu Carrito ({totalItems} items)</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="carrito-items">
          {carrito.map((item) => (
            <div key={item.id} className="carrito-item">
              <img src={item.imagen || 'https://via.placeholder.com/60'} alt={item.nombre} />
              
              <div className="carrito-item-info">
                <h4>{item.nombre}</h4>
                <p className="item-precio">${formatPrecio(item.precio)}</p>
              </div>
              
              <div className="carrito-item-cantidad">
                <button onClick={() => updateCantidad(item.id, Number(item.cantidad) - 1)}>-</button>
                <span>{item.cantidad}</span>
                <button onClick={() => updateCantidad(item.id, Number(item.cantidad) + 1)}>+</button>
              </div>
              
              <div className="carrito-item-subtotal">
                <p>${calcularSubtotal(item)}</p>
              </div>
              
              <button 
                className="remove-item" 
                onClick={() => removeFromCart(item.id)}
                title="Eliminar"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="carrito-footer">
          <div className="carrito-total">
            <span>Total:</span>
            <strong>${formatPrecio(total)}</strong>
          </div>
          
          <div className="carrito-buttons">
            <button onClick={clearCart} className="clear-btn">
              Vaciar Carrito
            </button>
            <button onClick={onClose} className="continue-btn">
              Seguir Comprando
            </button>
            <button className="checkout-btn">
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarritoModal;