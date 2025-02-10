"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type PriceContext = {
  totalAmount: number;
  setTotalAmount: Dispatch<SetStateAction<number>>;
  totalDiscount: number;
  setTotalDiscount: Dispatch<SetStateAction<number>>;
  noOfProducts: number;
  setNoOfProducts: Dispatch<SetStateAction<number>>;
};

const PriceContext = createContext<PriceContext | null>(null);

export default function PriceContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [noOfProducts, setNoOfProducts] = useState(0);

  return (
    <PriceContext.Provider
      value={{
        totalAmount,
        setTotalAmount,
        totalDiscount,
        setTotalDiscount,
        noOfProducts,
        setNoOfProducts,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
}

export function usePriceContext() {
  const context = useContext(PriceContext);

  if (!context)
    throw new Error(
      `usePriceContext must be used within a PriceContextProvider`
    );

  return context;
}
