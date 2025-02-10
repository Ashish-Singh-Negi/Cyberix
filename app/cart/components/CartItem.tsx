"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useUserInfoContext } from "@/contexts/userInfoContext";
import { useCartContext } from "@/contexts/cartContext";
import Link from "next/link";
import DialogBox from "@/app/components/DialogBox";

const CartItem = ({
  pid,
  color,
  varient,
  brandName,
  category,
  quantity,
  productName,
  img,
}: CartItemProps) => {
  const { info } = useUserInfoContext();
  const { setItemsInCart } = useCartContext();

  const [quantityCount, setQuantityCount] = useState(quantity);

  const [openDailogBox, setOpenDialogBox] = useState(false);

  const removeFromCart = async () => {
    try {
      setItemsInCart((prev) => {
        const updatedItem: CartItemProps[] = [];

        prev.map((prod) => {
          if (
            prod.varient === varient &&
            prod.pid === pid &&
            prod.color === color
          ) {
            return;
          }
          updatedItem.push(prod);
        });

        return updatedItem;
      });

      const { data } = await axios.post("/api/user/cart/remove", {
        uid: info!.userId,
        pid,
        color,
        varient,
      });

      console.log(data);
      setOpenDialogBox(false);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    setItemsInCart((prev) => {
      const updatedItem = prev.map((prod) => {
        if (prod.varient._id === varient._id && prod.color === color) {
          prod.quantity = quantityCount;
        }
        return prod;
      });
      return updatedItem;
    });
  }, [quantityCount]);

  return (
    <div className="h-fit w-full flex justify-center mb-6 relative">
      <DialogBox
        isOpen={openDailogBox}
        setIsOpen={setOpenDialogBox}
        title="Are you sure you want to remove ?"
        primaryBtnText="Remove"
        secondaryBtnText="Cancel"
        primaryBtnAction={removeFromCart}
      />
      <div className=" h-full bg-white dark:bg-gray-950 w-11/12 rounded-xl flex flex-col gap-4 p-6 box-border transition-all duration-300">
        <Link href={``} className="h-fit w-full flex gap-3">
          <div className="h-28 w-28  flex justify-center items-center transition-all ">
            <Image
              src={img}
              alt="product images"
              height={112}
              width={112}
              className="h-28 w-28 rounded-xl"
            />
          </div>
          <div className="h-full w-3/4">
            <p className="font-semibold h-5 transition-colors">
              {brandName} {productName} ({color} , {varient.storage}){" "}
            </p>
            <div className="text-base text-gray-500 flex items-end mt-3">
              <span className="text-base">&#8377;</span>
              <span className="line-through">
                {" "}
                {Number(varient.mrp) * quantityCount}
              </span>
              <p>
                <span className="ml-2 text-3xl font-semibold text-gray-700 dark:text-gray-200 flex ">
                  <span className="text-lg">&#8377;</span>
                  {Number(varient.salePrice) * quantityCount}
                </span>
              </p>
            </div>
          </div>
        </Link>
        <div className="h-10 w-40 flex items-center">
          <button
            onClick={() =>
              setQuantityCount((prev) => {
                if (prev > 1) {
                  return prev - 1;
                }
                return prev;
              })
            }
            className="px-2  text-2xl rounded-xl bg-gray-100 text-gray-950 active:scale-95"
          >
            -
          </button>
          <span className="px-4 text-2xl font-semibold">{quantityCount}</span>
          <button
            onClick={() => setQuantityCount((prev) => prev + 1)}
            className="px-2 text-2xl rounded-xl bg-gray-900 text-gray-50 active:scale-95"
          >
            +
          </button>
        </div>
        <button
          onClick={() => setOpenDialogBox(true)}
          className="absolute right-24 text-base font-semibold text-red-500 cursor-pointer active:scale-95"
        >
          REMOVE
        </button>
      </div>
    </div>
  );
};

export default CartItem;
