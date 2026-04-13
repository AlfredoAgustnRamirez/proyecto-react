import React, { useEffect, useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useCarrito } from '../context/CarritoContext';
import { ProductCard } from './ProductCard';
import AdminPanel from './AdminPanel';

const ProductGrid = () => {
  const { products, loading, error, fetchProducts, removeProduct } = useProducts();
  const { usuario } = useAuth();
  const { agregarAlCarrito } = useCarrito(); 
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const isAdmin = usuario?.rol === 'admin';

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (producto) => {
    setEditingProduct(producto);
    setShowAdminPanel(true);
  };

  const handleDelete = async (id) => {
    await removeProduct(id);
  };

  const handleAddToCart = (producto, cantidad) => {
    console.log('Agregando al carrito:', producto, cantidad); 
    agregarAlCarrito(producto, cantidad);
    alert(`${producto.nombre} agregado al carrito`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>❌ Error: {error}</p>
        <button onClick={() => fetchProducts()}>Reintentar</button>
      </div>
    );
  }

  return (
    <>
      <div className="product-grid-container">
        {isAdmin && (
          <div className="admin-header-bar">
            <button 
              className="btn-add-product"
              onClick={() => {
                setEditingProduct(null);
                setShowAdminPanel(true);
              }}
            >
              + Agregar Nuevo Producto
            </button>
          </div>
        )}

        <div className="products-grid">
          {products.length === 0 ? (
            <div className="empty-state">
              <p>No hay productos disponibles</p>
            </div>
          ) : (
            products.map((producto) => (
              <ProductCard 
                key={producto.id} 
                producto={producto}
                onAddToCart={handleAddToCart}  // ← Pasamos la función
                onEdit={isAdmin ? handleEdit : null}
                onDelete={isAdmin ? handleDelete : null}
              />
            ))
          )}
        </div>
      </div>

      {showAdminPanel && (
        <AdminPanel 
          onClose={() => {
            setShowAdminPanel(false);
            setEditingProduct(null);
          }}
          editingProduct={editingProduct}
        />
      )}
    </>
  );
};

export default ProductGrid;