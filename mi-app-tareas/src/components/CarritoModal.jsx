import { useCarrito } from '../context/CarritoContext';

export const CarritoModal = ({ isOpen, onClose }) => {
  const { carrito, eliminarDelCarrito, actualizarCantidad, totalPrecio } = useCarrito();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🛍️ Mi Carrito</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {carrito.length === 0 ? (
            <div className="cart-empty">
              <p style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🛒</p>
              <p>Tu carrito está vacío</p>
              <button onClick={onClose} style={{ marginTop: '1rem', background: '#6366f1', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>
                Seguir comprando
              </button>
            </div>
          ) : (
            carrito.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.imagen} alt={item.nombre} className="cart-item-image" />
                <div className="cart-item-info">
                  <div className="cart-item-title">{item.nombre}</div>
                  <div className="cart-item-price">${item.precio}</div>
                  <div className="quantity-controls">
                    <button className="quantity-btn" onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}>-</button>
                    <span className="quantity-value">{item.cantidad}</span>
                    <button className="quantity-btn" onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}>+</button>
                    <button className="delete-btn" onClick={() => eliminarDelCarrito(item.id)}>🗑️</button>
                  </div>
                </div>
                <div className="cart-item-total">
                  ${(item.precio * item.cantidad).toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>

        {carrito.length > 0 && (
          <div className="modal-footer">
            <div className="total-row">
              <span>Total:</span>
              <span className="total-amount">${totalPrecio.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">
              Proceder al pago →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};