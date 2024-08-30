import React from 'react';

export const SearchBar: React.FC = () => {
  return (
    <div style={{ display: 'flex', width: '100%', maxWidth: '1200px', marginBottom: '20px' }}>
      <input 
        type="text" 
        placeholder="Buscar..." 
        style={{ 
          flexGrow: 1, 
          padding: '10px', 
          border: '1px solid #ccc', 
          borderRadius: '4px 0 0 4px' 
        }} 
      />
      <button 
        type="submit" 
        style={{ 
          padding: '10px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '0 4px 4px 0', 
          cursor: 'pointer' 
        }}
      >
        🔍
      </button>
    </div>
  );
};