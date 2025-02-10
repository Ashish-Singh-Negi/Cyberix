"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { FaOpencart } from "react-icons/fa6";

import { useUserInfoContext } from "@/contexts/userInfoContext";
import { useCartContext } from "@/contexts/cartContext";

import CartItem from "./components/CartItem";
import Price from "./components/PriceDetails";
import Loader from "../components/Loader";
import { usePriceContext } from "@/contexts/priceContext";

const CartPage = () => {
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getItemsInCart = async () => {
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
    if (!info) return;

    getItemsInCart();
  }, [info]);

  useEffect(() => {
    if (!itemsInCart) return;

    setTotalAmount(0);
    setTotalDiscount(0);
    setNoOfProducts(0);

    itemsInCart.map((prod) => {
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
    });
  }, [itemsInCart]);

  if (loading) return <Loader />;

  return (
    <div className="h-full w-full px-4 py-2 ">
      {itemsInCart && itemsInCart.length ? (
        <>
          <h1 className="text-gray-900 dark:text-gray-50 font-semibold text-3xl">
            <button>Shopping Cart</button>
          </h1>
          <div className="h-[85vh] w-full flex">
            <main className="h-full w-[80%] box-border mt-6 overflow-y-auto rounded-lg">
              {itemsInCart.map((product) => (
                <CartItem
                  _id={product._id}
                  brandName={product.brandName}
                  category={product.category}
                  productName={product.productName}
                  color={product.color}
                  varient={product.varient}
                  pid={product.pid}
                  img={product.img}
                  quantity={product.quantity}
                  key={`${product._id} ${product.color}`}
                />
              ))}
            </main>
            <Price
              NoOfItems={noOfProducts}
              totalAmount={totalAmount}
              discount={totalDiscount}
            />
          </div>
        </>
      ) : (
        <>
          <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="h-20 w-20 mb-2">
              <FaOpencart className="h-full w-full" />
            </div>
            <p className="text-2xl font-semibold ">No Item Added In Cart</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
