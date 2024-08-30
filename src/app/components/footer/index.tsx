import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      backgroundColor: '#f8f9fa',
      color: '#6c757d',
      textAlign: 'center',
      padding: '10px 0',
      borderTop: '1px solid #dee2e6'
    }}>
      <p>© 2023 Tu Empresa. Todos los derechos reservados.</p>
    </footer>
  );
};