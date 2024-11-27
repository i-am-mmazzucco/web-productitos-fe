import React from 'react';
import Link from 'next/link';
import { ProductsContext } from '@/components/context';
import { ProductCard } from '@/components/product-card';
import { AddButton } from '@/components/add-button';
import Head from 'next/head';

const HomeComponent = () => {
  const { products, filteredProducts, reloadProducts, shouldPopUpSearch } = React.useContext(ProductsContext);

  const validProducts = filteredProducts.length && !shouldPopUpSearch ? filteredProducts : products;

  const productsWithAtLeastOneStore = validProducts.filter(product => product.stores.length && product.prices.length);

	return (
    <>
      <Head>
        <title>Bienvenido</title>
      </Head>
      <div style={{ maxWidth: '1200px', margin: '4% auto', padding: '20px' }}>
        <main style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '20px' 
        }}>
          {
            productsWithAtLeastOneStore.map((product) => (
              <Link href={`/product/${product._id}`} key={product._id} passHref className='home-map'>
                <ProductCard key={product._id} {...product} />
              </Link>
            ))
          }
          <AddButton reloadProducts={reloadProducts}/>
        </main>
      </div>
    </>
  );
};

export default HomeComponent;