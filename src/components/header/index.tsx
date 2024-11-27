import React from 'react';
import { SearchBar } from '../search-bar';
import Image from 'next/image';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header style={{ width: 'auto', height: 'auto' }}>
      <div
        style={{
          position: 'fixed',
          left: 25,
          top: 8,
          width: '10%', 
          height: '4vh',
          zIndex: 1111111111111115
        }}
      >
        <div style={{ cursor: 'pointer', display: 'inline-block', width: '100%', height: '100%' }}>
          <Link href="/" passHref>
            <Image 
              src={'/logo-no-background.svg'} 
              style={{ 
                width: '100%', 
                height: '100%', 
              }}
              width={10}
              height={100}
              alt='alt'
            />
          </Link>
        </div>
      </div>
      <div style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        paddingTop: '1%',
        height: '4vh',
        zIndex: 1111111
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
    </header>
  );
};