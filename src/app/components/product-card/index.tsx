import React from 'react';

interface ProductProps {
  imageUrl: string;
  price: number;
  location: string;
}

export const ProductCard: React.FC<ProductProps> = ({ imageUrl, price, location }) => {
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      borderRadius: '4px', 
      padding: '10px', 
      marginBottom: '20px',
      maxWidth: '300px'
    }}>
      <img src={imageUrl} alt="Product" style={{ width: '100%', height: 'auto' }} />
      <div style={{ marginTop: '10px' }}>
        <p style={{ fontWeight: 'bold' }}>Price: ${price}</p>
        <p style={{ color: '#666' }}>Location: {location}</p>
      </div>
    </div>
  );
};