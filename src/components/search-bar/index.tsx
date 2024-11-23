import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ProductsContext } from '@/components/context';
import { IProduct } from '@/interfaces/products.interface';
import Image from 'next/image';

export const SearchBar: React.FC = () => {
  const router = useRouter();
  const { products, filteredProducts, setFilteredProducts, reloadProducts, shouldPopUpSearch, setShouldPopUpSearch } = useContext(ProductsContext);
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === '') {
      setShouldPopUpSearch(false)
      setFilteredProducts([]);
    } else {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setShouldPopUpSearch(true)
      setFilteredProducts(results);
    }
  };

  const handleProductSelect = (productId: string) => {
    setQuery('');
    setFilteredProducts([]);
    router.push(`/product/${productId}`);
  };

  const handleReload = async () => {
    await reloadProducts();
    setShouldPopUpSearch(false)
    router.push('/');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        boxShadow: '2px 4px 12px #00000014',
        transition: 'all .3s cubic-bezier(0,0,.5,1)',
        borderRadius: '18px',
      }}
    >
      <div style={{ display: 'flex', width: '100%' }}>
        <input
          type="text"
          value={query}
          placeholder="Buscar..."
          onChange={handleInputChange}
          style={{
            flexGrow: 1,
            padding: '10px',
            border: '1px solid #ffffff',
            borderRadius: shouldPopUpSearch ? '18px 0 0 0px' : '18px 0 0 18px',
          }}
        />
        <button
          type="button"
          onClick={handleReload}
          style={{
            padding: '10px',
            backgroundColor: '#ffffff',
            color: 'black',
            border: 'none',
            cursor: 'pointer',
            borderRadius: shouldPopUpSearch ? '0px 18px 0px 0px' : '0px 18px 18px 0px',
          }}
        >
          🔍
        </button>
      </div>

      {shouldPopUpSearch && filteredProducts.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            maxHeight: '200px',
            overflowY: 'auto',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '0 0 18px 18px',
          }}
        >
          {filteredProducts.map((product) => (
            <div
            key={product._id}
            onClick={() => handleProductSelect(product._id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              cursor: 'pointer',
              borderBottom: '1px solid #f0f0f0',
              gap: '10px'
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: '40px',
                height: '40px',
                borderRadius: '5px',
                overflow: 'hidden',
              }}
            >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={40}
                  height={40}
                  style={{
                    borderRadius: '5px',
                    objectFit: 'cover',
                  }}
                />
            </div>
            <p
              style={{
                margin: 0,
                fontWeight: 'bold',
                fontSize: '14px',
                color: '#333',
              }}
            >
              {product.name}
            </p>
          </div>          
          ))}
        </div>
      )}
    </div>
  );
};
