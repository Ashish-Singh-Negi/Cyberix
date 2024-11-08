"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type ProductContext = {
  product: MobileProps | LaptopProps | null;
  setProduct: Dispatch<SetStateAction<MobileProps | LaptopProps | null>>;
};

const ProductContext = createContext<ProductContext | null>(null);

export default function ProductContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [product, setProduct] = useState<MobileProps | LaptopProps | null>(
    null
  );

  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);

  if (!context)
    throw new Error(
      "useProductContext must be used within a ProductContextProvider"
    );

  return context;
}
