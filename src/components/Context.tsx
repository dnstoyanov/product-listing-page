import { ReactNode, createContext, useContext, useState } from "react";
import { Category } from "./Categories";

export interface Product {
  id: number;
  name: string;
  price: number;
  images: string;
  title: string;
  description: string;
  category: string;
}

interface ContextType {
  currCategoryId: number | null;
  setCurrCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

export const initialOffsetValue = 10;

export const AppContext = createContext<ContextType>({
  offset: 1,
  setOffset: () => {},
  products: [],
  currCategoryId: null,
  setCurrCategoryId: () => {},
  categories: [],
  setProducts: () => {},
  setCategories: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currCategoryId, setCurrCategoryId] = useState<number | null>(null);
  const [offset, setOffset] = useState<number>(initialOffsetValue);

  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        categories,
        setCategories,
        currCategoryId,
        setCurrCategoryId,
        offset,
        setOffset,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
