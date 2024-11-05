"use client";

import React, { useEffect, useRef, useState } from "react";

import { useUserInfoContext } from "@/contexts/userInfoContext";

import CartItem from "./components/CartItem";
import Loader from "../components/Loader";

import axios from "axios";
import { useCartContext } from "@/contexts/cartContext";
import { FaOpencart } from "react-icons/fa6";

import Price from "./components/PriceDetails";
import { useSigninContext } from "@/contexts/signinContext";
import DialogBox from "../components/DialogBox";

const CartPage = () => {
  const { info } = useUserInfoContext();

  const { itemsInCart, setItemsInCart } = useCartContext();

  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getItemsInCart = async () => {
    try {
      setError(false);
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
    if (info) {
      // BUGGG
      getItemsInCart();
      return;
    }
    setLoading(false);
  }, [info]);

  useEffect(() => {
    if (!itemsInCart) return;

    setTotalAmount(0);
    setDiscount(0);

    itemsInCart.map((prod) => {
      setTotalAmount(
        (prev) => prev + Number(prod.varient.salePrice) * prod.quantity
      );
      setDiscount(
        (prev) =>
          prev +
          (Number(prod.varient.mrp) - Number(prod.varient.salePrice)) *
            prod.quantity
      );
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
          <div className="h-[800px] w-full flex">
            <main className="h-full w-[1200px] box-border mt-6 px-4 overflow-y-auto rounded-lg">
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
                  key={product.productName}
                />
              ))}
            </main>
            <Price
              NoOfItems={itemsInCart.length}
              totalAmount={totalAmount}
              discount={discount}
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
