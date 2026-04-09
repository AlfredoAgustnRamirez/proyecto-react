import { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';

export const ProductCard = ({ producto }) => {
  const { agregarAlCarrito } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const [animando, setAnimando] = useState(false);

  const handleAgregar = () => {
    agregarAlCarrito(producto, cantidad);
    setAnimando(true);
    setTimeout(() => setAnimando(false), 300);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={producto.imagen} alt={producto.nombre} />
        <span className="product-badge">-10%</span>
        <span className="product-rating">★ {producto.rating}</span>
      </div>
      <div className="product-info">
        <span className="product-category">{producto.categoria}</span>
        <h3 className="product-title">{producto.nombre}</h3>
        <p className="product-desc">{producto.descripcion}</p>
        
        <div className="quantity-selector">
          <button 
            className="quantity-selector-btn"
            onClick={() => setCantidad(Math.max(1, cantidad - 1))}
          >
            −
          </button>
          <span className="quantity-selector-value">{cantidad}</span>
          <button 
            className="quantity-selector-btn"
            onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
          >
            +
          </button>
        </div>

        <div className="product-footer">
          <div>
            <span className="product-price">${producto.precio}</span>
            <span className="product-old-price">${(producto.precio * 1.1).toFixed(0)}</span>
          </div>
          <button 
            className={`add-to-cart-btn ${animando ? 'animating' : ''}`}
            onClick={handleAgregar}
          >
            {animando ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>
  );
};