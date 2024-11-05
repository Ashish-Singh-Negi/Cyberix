"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type CartContext = {
  itemsInCart: CartItemProps[] | [];
  setItemsInCart: Dispatch<SetStateAction<CartItemProps[] | []>>;
};

const CartContext = createContext<CartContext | null>(null);

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItemProps[] | []>([]);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ itemsInCart: cartItems, setItemsInCart: setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useUserInfoContext must be used within a UserInfoContextProvider"
    );
  }

  return context;
}
