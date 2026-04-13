import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [nombre, setNombre] = useState('');
  const { login, register, error, loading } = useAuth();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let result;
    if (isRegister) {
      result = await register({ nombre, email, password });
    } else {
      result = await login(email, password);
    }
    
    if (result?.success) {
      onClose(); 
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content login-modal">
        <div className="modal-header">
          <h2>{isRegister ? '📝 Registrarse' : '🔑 Iniciar Sesión'}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" disabled={loading}>
            {loading ? 'Cargando...' : (isRegister ? 'Registrarse' : 'Ingresar')}
          </button>
        </form>
        
        <div className="modal-footer">
          <button 
            type="button" 
            onClick={() => setIsRegister(!isRegister)}
            className="switch-mode"
          >
            {isRegister 
              ? '¿Ya tienes cuenta? Inicia Sesión' 
              : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;