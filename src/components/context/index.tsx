'use context';
import { IProduct } from "@/interfaces/products.interface";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";

export const ProductsContext = React.createContext<{
  products: IProduct[];
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
  reloadProducts: () => Promise<void>;
  filteredProducts: IProduct[];
  setFilteredProducts: Dispatch<SetStateAction<IProduct[]>>;
  shouldPopUpSearch: boolean;
  setShouldPopUpSearch: Dispatch<SetStateAction<boolean>>;
}>({
  products: [],
  setProducts: () => {},
  reloadProducts: async () => {},
  filteredProducts: [],
  setFilteredProducts: () => {},
  shouldPopUpSearch: false,
  setShouldPopUpSearch: () => {}
});

const url = process.env.beUrl as string;

export const ProductsProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [shouldPopUpSearch, setShouldPopUpSearch] = useState<boolean>(false);

  const fetchProducts = async () => {
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
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts, reloadProducts: fetchProducts, filteredProducts, setFilteredProducts, shouldPopUpSearch, setShouldPopUpSearch }}>
      {children}
    </ProductsContext.Provider>
  )
}