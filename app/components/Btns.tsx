"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { useSigninContext } from "@/contexts/signinContext";
import axios from "axios";
import { auth } from "@/lib/firebaseConfig";

import { useRouter } from "next/navigation";
import { useCartContext } from "@/contexts/cartContext";
import { useUserInfoContext } from "@/contexts/userInfoContext";
import SmallLoader from "./SmallLoader";

export const SignInBtn = () => {
  const { signin, setSignin, signinMethod, setSigninMethod } =
    useSigninContext();

  const { setInfo } = useUserInfoContext();
  const { setItemsInCart } = useCartContext();

  const signoutHandler = async () => {
    try {
      await axios.post("/api/user/signout");

      setSignin(false);
      setInfo(null);
      setItemsInCart([]);

      toast.success("Sign Out Successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const signout = () => {
    signOut(auth);
    setSignin(false);
    setSigninMethod(undefined);
    setInfo(null);
    setItemsInCart([]);
    toast.success("Sign Out Successfully");
  };

  return signin ? (
    signinMethod === "GOOGLE & GITHUB" ? (
      <button
        onClick={signout}
        className="bg-gray-950 border-[1px] border-gray-950 text-white px-3 py-1 rounded-xl text-center font-semibold transition-all active:scale-95 dark:bg-gray-50 dark:text-gray-900"
      >
        Sign out
      </button>
    ) : (
      <button
        onClick={signoutHandler}
        className="bg-gray-950 border-[1px] border-gray-950 text-white px-3 py-1 rounded-xl text-center font-semibold transition-all active:scale-95 dark:bg-gray-50 dark:text-gray-900"
      >
        Sign out
      </button>
    )
  ) : (
    <Link
      href={"/signin"}
      className="bg-gray-950  border-[1px] border-gray-950 text-white px-4 py-1 rounded-xl text-center font-semibold transition-all active:scale-95 dark:bg-gray-50 dark:text-gray-900"
    >
      Sign in
    </Link>
  );
};

export const ThemeBtn = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button //[#212933]
      className={`h-8 w-8 group relative  flex justify-center items-center cursor-pointer
       duration-300 transition-all hover:rotate-[360deg] 
      rounded-3xl`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <MdDarkMode size={24} />
      ) : (
        <MdOutlineLightMode size={24} />
      )}

      <div className="h-10 w-10 rounded-3xl absolute -z-10 duration-200 transition-all group-active:bg-gray-900 group-active:scale-[100]"></div>
    </button>
  );
};

export const CartBtn = () => {
  return (
    <Link
      href={"/cart"}
      className="h-10 w-10 flex justify-center items-center cursor-pointer dark:text-gray-50"
    >
      <FaOpencart size={24} />
    </Link>
  );
};

const AddToCartBtn = ({
  pid,
  brandName,
  productName,
  color,
  varient,
  imgs,
  isBuying,
}: {
  pid: string;
  brandName: string;
  productName: string;
  color: string;
  varient: MobileVarient | LaptopVarient;
  imgs: Color[];
  isBuying: boolean;
}) => {
  const { info } = useUserInfoContext();
  const { itemsInCart } = useCartContext();

  const [loading, setLoading] = useState(false);

  const { push } = useRouter();
  const [isExist, setIsExist] = useState(false);

  const addProductIncartHandler = async () => {
    setLoading(true);
    if (!info) {
      push("/signin");
      return;
    }

    let img;
    imgs.map((imgis) => {
      if (imgis.color === color) {
        img = imgis.imgURLs[0];
      }
    });

    try {
      const { data } = await axios.post(`/api/user/cart/add`, {
        uid: info!.userId,
        pid,
        brandName,
        productName,
        color,
        varient,
        img,
        isBuying,
      });

      if (data.success) {
        push("/cart");
      }

      console.log(itemsInCart);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsExist(false);
    if (varient === null) {
      return;
    }

    itemsInCart &&
      itemsInCart.map((prod: CartItemProps) => {
        if (
          pid === prod.pid &&
          color === prod.color &&
          varient.memory === prod.varient.memory &&
          varient.storage === prod.varient.storage
        ) {
          setIsExist(true);
        }
      });
  }, [color, varient]);

  return (
    <>
      {isExist ? (
        <Link href={`/cart`}>
          <button className="h-14 w-[204px] rounded-lg border-2 border-gray-800 transition-all active:scale-95 hover:bg-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-900 hover:text-white dark:border-gray-100">
            Go to Cart
          </button>
        </Link>
      ) : varient === null ? (
        <button className="h-14 w-52 cursor-not-allowed rounded-lg border-2 border-gray-800 transition-all active:scale-95 dark:border-gray-100">
          Add to Cart
        </button>
      ) : (
        <button
          onClick={() => addProductIncartHandler()}
          className="h-14 w-52 rounded-lg border-2 flex justify-center items-center border-gray-800 transition-all active:scale-95 hover:bg-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-900 hover:text-white dark:border-gray-100"
        >
          {loading && <SmallLoader size="h-4 w-4" />} Add to Cart
        </button>
      )}
    </>
  );
};

export default AddToCartBtn;

export const BuyNowBtn = ({
  pid,
  brandName,
  productName,
  color,
  varient,
  imgs,
  isBuying,
}: {
  pid: string;
  brandName: string;
  productName: string;
  color: string;
  varient: MobileVarient | LaptopVarient | null;
  imgs: Color[];
  isBuying: boolean;
}) => {
  const { info } = useUserInfoContext();
  const { itemsInCart } = useCartContext();

  const [loading, setLoading] = useState(false);

  const { push } = useRouter();

  const addProductIncartHandler = async () => {
    setLoading(true);

    if (!info) {
      push("/signin");
      return;
    }

    let img;
    imgs.map((imgis) => {
      if (imgis.color === color) {
        img = imgis.imgURLs[0];
      }
    });

    try {
      const { data } = await axios.post(`/api/user/cart/add`, {
        uid: info!.userId,
        pid,
        brandName,
        productName,
        color,
        varient,
        img,
        isBuying,
      });

      if (data.success) push("/buy");

      console.log(data);
      setLoading(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response.data.message);
    }
  };

  return varient === null ? (
    <button className="h-14 w-52 cursor-not-allowed rounded-lg flex justify-center items-center bg-gray-800 text-white transition-all active:scale-95 hover:bg-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200">
      Buy Now
    </button>
  ) : (
    <button
      onClick={addProductIncartHandler}
      className="h-14 w-52 rounded-lg flex justify-center items-center bg-gray-800 text-white transition-all active:scale-95 hover:bg-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
    >
      {loading && <SmallLoader size="h-4 w-4" />} Buy Now
    </button>
  );
};
