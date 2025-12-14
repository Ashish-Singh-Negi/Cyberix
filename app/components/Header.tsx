"use client";

import React, { useEffect, useState } from "react";
import { CartBtn, SignInBtn, ThemeBtn } from "./Btns";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMenuContext } from "@/contexts/menuContext";
import { useUserInfoContext } from "@/contexts/userInfoContext";
import { useSigninContext } from "@/contexts/signinContext";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { useCartContext } from "@/contexts/cartContext";

const Header = () => {
  const pathname = usePathname();

  const [isActive, setIsActive] = useState(false);

  const { menuOpen, setMenuOpen } = useMenuContext();
  const { setInfo } = useUserInfoContext();
  const { signin, setSignin } = useSigninContext();
  const { setItemsInCart } = useCartContext();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get("/api/user/profile");

        console.log(data);

        if (!data.success) {
          return;
        }

        console.log(data);
        setSignin(true);
        setInfo({
          userId: data.data._id,
          username: data.data.username,
          email: data.data.email,
          address: data.data.address,
        });

        setItemsInCart(data.data.itemsInCart);
      } catch (error) {
        console.error(error);
      }
    };

    getProfile();
  }, [signin]);

  useEffect(() => {
    if (pathname === "/signin") {
      setIsActive(true);
    } else if (pathname === "/signup") {
      setIsActive(true);
    } else if (pathname === "/reset") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [pathname]);

  return (
    <header className="sticky h-14 w-full z-10 flex justify-between lg:px-3 px-1 items-center border-b-2 bg-white dark:bg-gray-900 dark:shadow-gray-700">
      <Toaster />
      <div className="h-full flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`h-12 w-12 rounded-full bottom-2 left-2 flex ${
            isActive ? "hidden" : ""
          } lg:hidden flex-col gap-1 justify-center items-center`}
        >
          <span
            className={`h-1 w-7 bg-gray-950 dark:bg-gray-50 rounded-lg transition-all  ${
              menuOpen && " translate-y-2 rotate-45 "
            }`}
          ></span>
          <span
            className={`h-1 w-7 bg-gray-950 dark:bg-gray-50 rounded-lg transition-all  ${
              menuOpen && " opacity-0 scale-0"
            }`}
          ></span>
          <span
            className={`h-1 w-7 bg-gray-950 dark:bg-gray-50 rounded-lg transition-all  ${
              menuOpen && " -translate-y-2 -rotate-45 "
            }`}
          ></span>
        </button>
        <h1 className="text-3xl font-bold text-gray-800 cursor-pointer dark:text-gray-50">
          <Link href={"/"}>Cyberix.</Link>
        </h1>
      </div>
      <div className="w-48 flex items-center gap-3">
        <CartBtn />
        <ThemeBtn />
        <SignInBtn />
      </div>
    </header>
  );
};

export default Header;
