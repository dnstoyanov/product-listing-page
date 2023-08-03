import { ReactNode, createContext, useContext, useState } from "react";

interface ProductsContextType {
  products: any[];
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
}

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  setProducts: () => {},
});

export const useProductsContext = () => useContext(ProductsContext);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<any[]>([]);
  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
