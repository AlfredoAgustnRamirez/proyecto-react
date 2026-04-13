// src/App.jsx
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CarritoProvider } from './context/CarritoContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import LoginModal from './components/LoginModal';

function AppContent() {
  const [showLogin, setShowLogin] = useState(false);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      <Navbar onLoginClick={() => setShowLogin(true)} />
      <Hero 
        onLoginClick={() => setShowLogin(true)} 
        onShopClick={scrollToProducts}
      />
      <main className="main-content" id="products-section">
        <ProductGrid />
      </main>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
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