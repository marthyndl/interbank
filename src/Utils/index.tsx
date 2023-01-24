import { SetStateAction } from "react";
import { Product } from "../Context/types";

export const loadProducts = async (
  setProductosFromFetch: {
    (value: SetStateAction<Product[]>): void;
    (arg0: Product[]): void;
  },
  setProductsFiltered: {
    (value: SetStateAction<Product[]>): void;
    (arg0: Product[]): void;
  },
  setLoading: { (value: SetStateAction<boolean>): void; (arg0: boolean): void }
) => {
  setLoading(true);
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  console.log("data *** ", data);
  setProductosFromFetch(data);
  setProductsFiltered(data);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
};
