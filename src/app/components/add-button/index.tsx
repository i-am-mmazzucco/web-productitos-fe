import React from 'react';

export const AddButton: React.FC = () => {
  return (
    <button 
      style={{ 
        position: 'fixed',
        left: '26.88%', // Changed from right to left
        bottom: '8%', // Adjusted to account for fixed footer
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#007bff',
        color: 'white',
        fontSize: '24px',
        border: 'none',
        cursor: 'pointer',
        zIndex: 1000, // Ensure it's above other elements
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        transition: 'transform 0.3s ease',
      }}
    >
      +
    </button>
  );
};