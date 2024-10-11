import React from 'react';

export const SearchBar: React.FC = () => {
  return (
    <div style={{ display: 'flex', width: '100%', maxWidth: '800px', boxShadow: '2px 4px 12px #00000014', transition: 'all .3s cubic-bezier(0,0,.5,1)', borderRadius: '18px' }}>
      <input 
        type="text" 
        placeholder="Buscar..." 
        style={{ 
          flexGrow: 1, 
          padding: '10px', 
          border: '1px solid #ffffff', 
          borderRadius: '18px 0 0 18px'
        }} 
      />
      <button 
        type="submit" 
        style={{ 
          padding: '10px', 
          backgroundColor: '#ffffff', 
          color: 'white', 
          border: 'none', 
          cursor: 'pointer',
          borderRadius: '0px 18px 18px 0px'
        }}
      >
        🔍
      </button>
    </div>
  );
};