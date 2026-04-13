// src/components/Hero.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Hero = ({ onLoginClick, onShopClick }) => {
  const { usuario } = useAuth();

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className="hero-particles">
          <span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span>
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-icon">⚡</span>
          <span>Ofertas exclusivas</span>
        </div>
        
        <h1 className="hero-title">
          Tecnología que
          <span className="hero-gradient"> transforma</span>
          <br />tu mundo digital
        </h1>
        
        <p className="hero-description">
          Descubre los mejores productos tecnológicos con precios increíbles. 
          Envío gratis en compras mayores a $50.000.
        </p>
        
        <div className="hero-buttons">
          <button className="hero-btn-primary" onClick={onShopClick}>
            Comprar ahora
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          
          {!usuario && (
            <button className="hero-btn-secondary" onClick={onLoginClick}>
              Iniciar sesión
            </button>
          )}
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Clientes felices</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">500+</span>
            <span className="stat-label">Productos</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Soporte</span>
          </div>
        </div>
      </div>

      <div className="hero-image">
        <div className="hero-image-container">
          <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=600&fit=crop" alt="Tech products" />
        </div>
        <div className="floating-card card-1">
          <span>🎧</span>
          <div>
            <strong>-25%</strong>
            <p>Audio</p>
          </div>
        </div>
        <div className="floating-card card-2">
          <span>💻</span>
          <div>
            <strong>Nuevo</strong>
            <p>Laptops</p>
          </div>
        </div>
        <div className="floating-card card-3">
          <span>📱</span>
          <div>
            <strong>Ofertas</strong>
            <p>Smartphones</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;