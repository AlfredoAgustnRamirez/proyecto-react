import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProductProvider, useProducts } from './context/ProductContext';
import { CarritoProvider } from './context/CarritoContext';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { LoginModal } from './components/LoginModal';

function AppContent() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { productos, loading, categorias } = useProducts();
  const { user } = useAuth();

  const productosFiltrados = categoriaSeleccionada === 'todos'
    ? productos
    : productos.filter(p => p.categoria === categoriaSeleccionada);

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar onLoginClick={handleOpenLogin} />
      
      <section className="hero">
        <div className="container">
          <h1>Bienvenido a TechStore</h1>
          <p>Los mejores productos tecnológicos al mejor precio</p>
          {!user && (
            <button className="hero-btn" onClick={handleOpenLogin}>
              Iniciar Sesión
            </button>
          )}
        </div>
      </section>

      <div className="container">
        <div className="filters-container">
          {categorias.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${categoriaSeleccionada === cat ? 'active' : ''}`}
              onClick={() => setCategoriaSeleccionada(cat)}
            >
              {cat === 'todos' ? '✨ Todos' : cat}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {productosFiltrados.map(producto => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      </div>

      <footer className="footer">
        <p>© 2024 TechStore - Todos los derechos reservados</p>
      </footer>

      {isLoginOpen && (
        <LoginModal 
          isOpen={isLoginOpen} 
          onClose={handleCloseLogin} 
        />
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CarritoProvider>
          <AppContent />
        </CarritoProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;