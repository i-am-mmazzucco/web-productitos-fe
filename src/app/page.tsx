import React from 'react';
import { SearchBar } from './components/search-bar';
import { ProductCard } from './components/product-card';
import { AddButton } from './components/add-button';
import { Footer } from './components/footer';

interface Product {
  id: number;
  imageUrl: string;
  price: number;
  location: string;
}

const Home: React.FC = () => {
  // TODO: To connect with API
  const products: Product[] = [
    { id: 1, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "0.3M" },
    { id: 2, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "0.3M" },
    { id: 3, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "0.3M" },
    { id: 4, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "0.3M" },
    { id: 5, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "0.3M" },
    { id: 6, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "0.3M" },
    { id: 7, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "0.3M" },
    { id: 8, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "0.3M" },
    { id: 9, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "0.3M" },
    { id: 10, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "0.3M" },
    { id: 11, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "0.3M" },
    { id: 12, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "0.3M" },
    { id: 13, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "0.3M" },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header style={{ width: '100%' }}>
        <SearchBar />
      </header>
      <main style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px' 
      }}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </main>
      <AddButton />
      <Footer />
    </div>
  );
};

export default Home;