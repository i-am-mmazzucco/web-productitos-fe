'use context';
import React, { useState, Dispatch, SetStateAction } from "react";

interface Product {
  id: number;
  imageUrl: string;
  price: number;
  location: string;
}

export const ProductsContext = React.createContext<{
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
}>({
  products: [],
  setProducts: () => {},
});

export const ProductsProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "3km's" },
    { id: 2, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "3km's" },
    { id: 3, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "3km's" },
    { id: 4, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "3km's" },
    { id: 5, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "3km's" },
    { id: 6, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "3km's" },
    { id: 7, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "3km's" },
    { id: 8, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "3km's" },
    { id: 9, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "3km's" },
    { id: 10, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "3km's" },
    { id: 11, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "3km's" },
    { id: 12, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "3km's" },
    { id: 13, imageUrl: "https://masterpiecer-images.s3.yandex.net/4ef719d36ac611ee975a56181a0358a2:upscaled", price: 123, location: "3km's" },
  ]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}