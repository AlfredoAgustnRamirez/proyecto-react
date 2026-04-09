import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api';

export const AdminPanel = ({ onClose }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    imagen: '',
    descripcion: '',
    stock: '',
    rating: '4.5'
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      alert('Error al cargar productos');
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      nombre: '',
      precio: '',
      categoria: '',
      imagen: '',
      descripcion: '',
      stock: '',
      rating: '4.5'
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      nombre: product.nombre,
      precio: product.precio,
      categoria: product.categoria,
      imagen: product.imagen,
      descripcion: product.descripcion,
      stock: product.stock,
      rating: product.rating
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este producto?')) return;
    
    try {
      setLoading(true);
      await deleteProduct(id);
      alert('Producto eliminado');
      await loadProducts();
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre.trim()) {
      alert('El nombre es requerido');
      return;
    }
    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      alert('El precio debe ser mayor a 0');
      return;
    }
    if (!formData.categoria.trim()) {
      alert('La categoría es requerida');
      return;
    }
    
    setLoading(true);
    
    const productData = {
      nombre: formData.nombre,
      precio: parseFloat(formData.precio),
      categoria: formData.categoria,
      imagen: formData.imagen || 'https://picsum.photos/300/200',
      descripcion: formData.descripcion,
      stock: parseInt(formData.stock) || 0,
      rating: parseFloat(formData.rating) || 4.5
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        alert('Producto actualizado');
      } else {
        await createProduct(productData);
        alert('Producto creado');
      }
      resetForm();
      await loadProducts();
    } catch (error) {
      console.error('Error al guardar:', error);
      alert(error.response?.data?.message || 'Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="modal-overlay-admin" onClick={handleClose}>
        <div className="admin-panel">
          <div className="admin-header">
            <h2>Acceso Denegado</h2>
            <button className="close-btn" onClick={handleClose}>✕</button>
          </div>
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <p>No tienes permisos de administrador.</p>
            <button onClick={handleClose} className="login-btn" style={{ marginTop: '1rem' }}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay-admin" onClick={handleOverlayClick}>
      <div className="admin-panel">
        <div className="admin-header">
          <h2>Panel de Administración</h2>
          <button className="close-btn" onClick={handleClose}>✕</button>
        </div>

        <div className="admin-content">
          <div className="admin-form">
            <h3>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nombre del producto *"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Precio *"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Categoría * (ej: audio, telefonos, computadoras)"
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="URL de la imagen (dejar vacío para usar default)"
                value={formData.imagen}
                onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
              />
              <textarea
                placeholder="Descripción del producto"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                rows="3"
              />
              <input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
              <input
                type="number"
                step="0.1"
                placeholder="Rating (1-5)"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              />
              
              <div className="admin-form-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? 'Guardando...' : (editingProduct ? 'Actualizar' : 'Crear Producto')}
                </button>
                {editingProduct && (
                  <button type="button" onClick={resetForm} className="cancel-btn">
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="admin-products-list">
            <h3>Productos Existentes ({products.length})</h3>
            <div className="admin-products-grid">
              {products.map(product => (
                <div key={product.id} className="admin-product-item">
                  <img src={product.imagen} alt={product.nombre} />
                  <div className="admin-product-info">
                    <h4>{product.nombre}</h4>
                    <p>${product.precio}</p>
                    <p className="admin-product-category">{product.categoria}</p>
                  </div>
                  <div className="admin-product-actions">
                    <button onClick={() => handleEdit(product)} className="edit-btn">✏️</button>
                    <button onClick={() => handleDelete(product.id)} className="delete-btn-admin">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};