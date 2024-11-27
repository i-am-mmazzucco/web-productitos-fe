/* eslint-disable @next/next/no-img-element */
import { getHaversine } from '@/helpers/getters';
import { IProduct } from '@/interfaces/products.interface';
import React, { useEffect, useState } from 'react';

export const ProductCard: React.FC<IProduct> = ({ imageUrl, name, prices, stores }) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; long: number } | null>(null);
  const [distance, setDistance] = useState<string | null>(null);

  const minPrice = prices.reduce((min, item) => {
    return item.amount < min.amount ? item : min;
  }, prices[0]);
  
  const store = stores.find(store => store._id === minPrice.store);

  useEffect(() => {
    if (navigator.geolocation && store) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLong = position.coords.longitude;

          setUserLocation({ lat: userLat, long: userLong });

          const distanceToStore = getHaversine(
            userLat,
            userLong,
            store.lat,
            store.long
          );

          setDistance(distanceToStore.toFixed(2)); // Format to two decimals
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }, [store]);
  
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
          💲 {minPrice?.amount}
        </p>
        <p style={{ color: '#1d1d1f', fontWeight: 'bold' }}>📍  {distance ? `${distance} km` : '... km'}</p>
      </div>
    </div>
  );
};