/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface ProductProps {
  imageUrl: string;
  price: number;
  location: string;
  name: string;
}

export const ProductCard: React.FC<ProductProps> = ({ imageUrl, price, location, name }) => {
  return (
    <div style={{ 
      borderRadius: '18px', 
      padding: '10px', 
      marginBottom: '20px',
      maxWidth: '300px',
      height: '360px',
      boxShadow: '2px 4px 12px #00000014',
      transition: 'all .3s cubic-bezier(0,0,.5,1)',
      whiteSpace: 'normal',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div style={{ marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center', fontWeight: 'bold' }}>{name}</div>
      <img src={imageUrl} alt="Product" style={{ 
        width: '100%', 
        height: '250px',
        objectFit: 'contain',
        objectPosition: 'center'
      }} />
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <p style={{ color: '#1d1d1f', fontWeight: 'bold' }}>
          💲 {price}
        </p>
        <p style={{ color: '#1d1d1f', fontWeight: 'bold' }}>📍 {location}</p>
      </div>
    </div>
  );
};