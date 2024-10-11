import React from 'react';
import Link from 'next/link';
import { ProductsContext } from '@/components/context';
import { ProductCard } from '@/components/product-card';
import { AddButton } from '@/components/add-button';
import Head from 'next/head';

const HomeComponent = () => {
  // TODO: To connect with API
  const { products } = React.useContext(ProductsContext);

	return (
    <>
      <Head>
        <title>Welcome</title>
      </Head>
      <div style={{ maxWidth: '1200px', margin: '4% auto', padding: '20px' }}>
        <main style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '20px' 
        }}>
          {
            products.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} passHref className='home-map'>
                <ProductCard key={product.id} {...product} />
              </Link>
            ))
          }
          <AddButton />
        </main>
      </div>
    </>
  );
};

export default HomeComponent;