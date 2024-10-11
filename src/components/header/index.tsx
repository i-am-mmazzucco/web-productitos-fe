import React from 'react';
import { SearchBar } from '../search-bar';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation'

export const Header: React.FC = () => {
  const router = useRouter()

  return (
    <header style={{ width: 'auto', height: 'auto' }}>
      <div
        style={{
          position: 'fixed',
          left: 25,
          top: 8,
          width: '100%', 
          height: '4vh'
        }}
      >
        <img 
          onClick={() => router.push('/')} 
          src={'logo-no-background.svg'} 
          style={{ 
            width: '10%', 
            height: '100%', 
          }}
        />
      </div>
      { 
        usePathname() === '/' && (
          <div style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            paddingTop: '1%',
            height: '4vh',
          }}>
            <div style={{ 
              display: 'flex', 
              width: '100%', 
              height: '100%', 
              alignItems: 'center', 
              justifyContent: 'center', 
              alignContent: 'center' 
            }}>
              <SearchBar />
            </div>
          </div>
        )
      }
    </header>
  );
};