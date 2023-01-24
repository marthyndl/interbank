import React, { createContext, useState, useEffect, ReactNode } from "react";
import { loadProducts } from "../Utils/index";
import { Product } from "./types";

export interface IProductProviderProps {
  productosFromFetch: Product[];
  setProductosFromFetch: (
    currentProduct: Product[],
    products: Product[]
  ) => void;
  productsFiltered: Product[];
  setProductsFiltered: (currentProduct: Product[], products: Product[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  textFilter: string;
  setTextFilter: (text: string) => void;
  onFilterChange: (text: string) => void;
  addSentence: (text: Product) => void;
}

export const DataContext = createContext<IProductProviderProps | null>(null);

export const DataProvider: ({
  children,
}: {
  children: ReactNode;
}) => JSX.Element = ({ children }) => {
  const [productosFromFetch, setProductosFromFetch] = useState<Product[]>([]);
  const [productsFiltered, setProductsFiltered] = useState<Product[]>([]);
  const [textFilter, setTextFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadProducts(setProductosFromFetch, setProductsFiltered, setLoading);
  }, []);

  const onFilterChange = (value: string): void => {
    setTextFilter(value);
    var productosFilter: Product[] = [];
    if (value === "") {
      productosFilter = productosFromFetch.filter((producto: Product) => {
        return true;
      });
    } else {
      productosFilter = productosFromFetch.filter(
        (producto: Product): boolean | undefined => {
          var product_name: string = producto.title.toLowerCase();
          if (product_name.includes(value.toLowerCase())) {
            return true;
          }
          return false;
        }
      );
    }

    setProductsFiltered(productosFilter);
  };

  const addSentence = (newSentence: Product): void => {
    setProductosFromFetch([...productosFromFetch, newSentence]);
    setProductsFiltered([...productsFiltered, newSentence]);
  };

  const providerValue: IProductProviderProps = {
    productosFromFetch,
    setProductosFromFetch,
    productsFiltered,
    setProductsFiltered,
    loading,
    setLoading,
    textFilter,
    setTextFilter,
    onFilterChange,
    addSentence,
  };

  return (
    <DataContext.Provider value={providerValue}>
      {children}
    </DataContext.Provider>
  );
};
