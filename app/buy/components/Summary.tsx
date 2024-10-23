"use client";

import CartItem from "@/app/cart/components/CartItem";
import { useCartContext } from "@/contexts/cartContext";
import { useUserInfoContext } from "@/contexts/userInfoContext";
import React from "react";

const Summary = () => {
  const { info } = useUserInfoContext();

  const { itemsInCart, setItemsInCart } = useCartContext();

  return (
    <>
      {itemsInCart.map((product) => (
        <CartItem
          brandName={product.brandName}
          category={product.category}
          productName={product.productName}
          color={product.color}
          varient={product.varient}
          pid={product.pid}
          img={product.img}
          quantity={product.quantity}
          key={product.productName}
        />
      ))}
    </>
  );
};

export default Summary;
