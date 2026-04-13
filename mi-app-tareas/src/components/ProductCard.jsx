import { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';

export const ProductCard = ({ producto, onAddToCart, onEdit, onDelete }) => {
  const { agregarAlCarrito } = useCarrito();
  const { usuario } = useAuth();
  const [cantidad, setCantidad] = useState(1);
  const [animando, setAnimando] = useState(false);
  
  const isAdmin = usuario?.rol === 'admin';
  const isAuthenticated = !!usuario;

  const handleAgregar = () => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para comprar');
      return;
    }
    
    if (onAddToCart) {
      onAddToCart(producto, cantidad);
    } else {
      agregarAlCarrito(producto, cantidad);
    }
    
    setAnimando(true);
    setTimeout(() => setAnimando(false), 300);
  };

  const handleEdit = () => {
    if (onEdit) onEdit(producto);
  };

  const handleDelete = () => {
    if (onDelete && window.confirm(`¿Eliminar "${producto.nombre}"?`)) {
      onDelete(producto.id);
    }
  };

  return (
    <div className="product-card">
      {producto.descuento && (
        <div className="product-badge">-{producto.descuento}%</div>
      )}
      
      {isAdmin && (
        <div className="admin-badge">👑 Admin</div>
      )}

      <div className="product-image">
        <img src={producto.imagen || 'https://via.placeholder.com/300'} alt={producto.nombre} />
        <span className="product-rating">★ {producto.rating || 4.5}</span>
      </div>
      
      <div className="product-info">
        <span className="product-category">{producto.categoria}</span>
        <h3 className="product-title">{producto.nombre}</h3>
        <p className="product-desc">{producto.descripcion || 'Sin descripción'}</p>
        
        <div className="product-stock">
          {producto.stock > 0 ? (
            <span className="in-stock">✓ Stock: {producto.stock} unidades</span>
          ) : (
            <span className="out-stock">✗ Agotado</span>
          )}
        </div>
        
        {producto.stock > 0 && (
          <div className="quantity-selector">
            <button 
              className="quantity-selector-btn"
              onClick={() => setCantidad(Math.max(1, cantidad - 1))}
              disabled={!isAuthenticated}
            >
              −
            </button>
            <span className="quantity-selector-value">{cantidad}</span>
            <button 
              className="quantity-selector-btn"
              onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
              disabled={!isAuthenticated}
            >
              +
            </button>
          </div>
        )}

        <div className="product-footer">
          <div>
            <span className="product-price">${producto.precio}</span>
            {producto.precioOriginal && (
              <span className="product-old-price">${producto.precioOriginal}</span>
            )}
          </div>
          
          <div className="product-actions">
            <button 
              className={`add-to-cart-btn ${animando ? 'animating' : ''}`}
              onClick={handleAgregar}
              disabled={producto.stock === 0 || !isAuthenticated}
            >
              {animando ? '✓' : (producto.stock === 0 ? '❌' : '+')}
            </button>
            
            {isAdmin && (
              <>
                <button 
                  className="edit-product-btn"
                  onClick={handleEdit}
                  title="Editar producto"
                >
                  ✏️
                </button>
                <button 
                  className="delete-product-btn"
                  onClick={handleDelete}
                  title="Eliminar producto"
                >
                  🗑️
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};