'use context';
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";

interface Product {
  id: number;
  name: string;
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

const url = process.env.beUrl as string;

export const ProductsProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${url}/products`, {
          method: 'GET',
          headers:{
             'Content-Type': 'application/json'
          }
        });
        const data = await response.json();

        if (data.statusCode) {
          throw new Error(`Was an error posting data. ${JSON.stringify(data)}`)
        }
  
        setProducts(data);
       } catch (error) {
          console.log(error);
       }
    })();
  }, [])

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}