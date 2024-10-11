import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      position: 'relative',
      left: 0,
      bottom: 0,
      width: '100%',
      backgroundColor: 'rgba(555, 555, 555, 0.063)',
      color: '#6c757d',
      textAlign: 'center',
      padding: '10px 0',
      borderTop: '1px solid #dee2e6'
    }}>
      <p>© 2024 Productitos. Todos los derechos reservados.</p>
    </footer>
  );
};