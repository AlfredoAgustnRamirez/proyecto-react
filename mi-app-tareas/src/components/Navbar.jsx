import { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';
import { CarritoModal } from './CarritoModal';
import { AdminPanel } from './AdminPanel';

export const Navbar = ({ onLoginClick }) => {
  const { totalItems } = useCarrito();
  const { user, logout } = useAuth();
  const [isCarritoOpen, setIsCarritoOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
  };

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">
            <div className="logo-icon">T</div>
            <span className="logo-text">TechStore</span>
          </div>
          
          <div className="nav-links">
            <a href="#">Inicio</a>
            <a href="#">Productos</a>
            <a href="#">Ofertas</a>
            <a href="#">Contacto</a>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <button onClick={handleOpenAdmin} className="admin-btn">
                    👑 Admin
                  </button>
                )}
                <span style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>
                  Hola, {user.name}
                </span>
                <button onClick={logout} className="cart-btn">
                  Salir
                </button>
              </>
            ) : (
              <button onClick={onLoginClick} className="cart-btn">
                Ingresar
              </button>
            )}
            
            <button className="cart-btn" onClick={() => setIsCarritoOpen(true)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6" />
              </svg>
              {totalItems > 0 && (
                <span className="cart-count">{totalItems}</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <CarritoModal isOpen={isCarritoOpen} onClose={() => setIsCarritoOpen(false)} />
      
      {isAdminOpen && (
        <AdminPanel onClose={handleCloseAdmin} />
      )}
    </>
  );
};