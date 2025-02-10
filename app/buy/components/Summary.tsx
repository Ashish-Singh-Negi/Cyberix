"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { useCartContext } from "@/contexts/cartContext";
import { useUserInfoContext } from "@/contexts/userInfoContext";
import { usePriceContext } from "@/contexts/priceContext";

import CartItem from "@/app/cart/components/CartItem";
import SmallLoader from "@/app/components/SmallLoader";

const Summary = () => {
  const { info } = useUserInfoContext();

  const { itemsInCart, setItemsInCart } = useCartContext();
  const {
    noOfProducts,
    setNoOfProducts,
    totalAmount,
    setTotalAmount,
    totalDiscount,
    setTotalDiscount,
  } = usePriceContext();

  const [loading, setLoading] = useState(false);

  const getItemsInCart = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/user/cart/get", {
        id: info!.userId,
      });

      setItemsInCart(data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!info?.userId) return;

    getItemsInCart();
  }, []);

  useEffect(() => {
    if (!itemsInCart) return;

    setTotalAmount(0);
    setTotalDiscount(0);
    setNoOfProducts(0);

    itemsInCart.map((prod) => {
      if (prod.isBuying) {
        setTotalAmount(
          (prev) => prev + Number(prod.varient.salePrice) * prod.quantity
        );
        setTotalDiscount(
          (prev) =>
            prev +
            (Number(prod.varient.mrp) - Number(prod.varient.salePrice)) *
              prod.quantity
        );
        setNoOfProducts((prev) => prev + 1);
      }
    });
  }, [itemsInCart]);

  if (loading)
    return (
      <div className="min-h-8 w-full flex justify-center items-center">
        <SmallLoader size="h-8 w-8" />
      </div>
    );

  return (
    <>
      {itemsInCart &&
        itemsInCart.map((product) => {
          if (product.isBuying)
            return (
              <CartItem
                key={`${product._id} ${product.color}`}
                _id={product._id}
                brandName={product.brandName}
                category={product.category}
                productName={product.productName}
                color={product.color}
                varient={product.varient}
                pid={product.pid}
                img={product.img}
                quantity={product.quantity}
              />
            );
        })}
    </>
  );
};

export default Summary;
