"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

import { useSigninContext } from "@/contexts/signinContext";
import { signInWithPopup } from "firebase/auth";
import {
  auth,
  gitHubAuthProvider,
  googleAuthProvider,
} from "@/lib/firebaseConfig";

import { ImGithub } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { useUserInfoContext } from "@/contexts/userInfoContext";
import { useCartContext } from "@/contexts/cartContext";

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { setSignin, setSigninMethod } = useSigninContext();
  const { info, setInfo } = useUserInfoContext();
  const { setItemsInCart } = useCartContext();

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const { back } = useRouter();

  const signInHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user.email && !user.password) {
      setErr("please enter all feild");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/user/signin", user);
      const { message, success } = res.data;

      if (!success) {
        setErr(message);
        setLoading(false);
        toast.error(res.data.message);
        return;
      }

      const getProfile = async (url: string, retries: number) => {
        try {
          const { data } = await axios.get(url);

          console.log(data.data);

          setInfo({
            ...info,
            userId: data.data._id,
            username: data.data.username,
            email: data.data.email,
            address: data.data.address,
          });

          setItemsInCart(data.data.itemsInCart);

        } catch (error) {
          if (retries > 0) {
            console.warn(`Retrying... (${retries} attempts left)`);
            return getProfile(url, retries - 1);
          }
          console.error(error);
        }
      };
      
      getProfile("/api/user/profile", 3);
      
      toast.success(res.data.message);
      setSignin(true);
      setLoading(false);

      back();
    } catch (error) {
      console.error(error);
    }
  };

  // TODO: Incomplete firebase Auth -----start
  const signinWithGoogleHandler = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      setSignin(true);
      setSigninMethod("GOOGLE & GITHUB");
      toast.success("Sign in Successfully");
      back();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const signinWithGitHubHandler = async () => {
    try {
      await signInWithPopup(auth, gitHubAuthProvider);
      setSignin(true);
      setSigninMethod("GOOGLE & GITHUB");
      toast.success("Sign in Successfully");

      back();
    } catch (error: any) {
      console.error(error.message);
    }
  };
  // end-----
  return (
    <main className="h-[550px] w-[500px] border-[1px] rounded-2xl border-custom flex gap-2 flex-col items-center box-border px-12">
      <p className="text-3xl font-bold text-gray-800 dark:text-gray-50 mt-10 mb-6">
        Cyberix
      </p>
      <h1 className="font-semibold text-2xl mb-2">Sign in to your account</h1>
      <div className="h-10 flex gap-2">
        <button
          onClick={signinWithGoogleHandler}
          className="bg-gray-100 flex items-center gap-[6px] py-2 px-4 rounded-lg font-medium text-sm transition-all active:scale-95 hover:bg-gray-300 dark:bg-gray-800"
        >
          <FcGoogle className="inline h-5 w-5" />
          Sign in with Google
        </button>
        <button
          onClick={signinWithGitHubHandler}
          className="bg-gray-100 flex items-center gap-[6px] py-2 px-4 rounded-lg font-medium text-sm transition-all active:scale-95 hover:bg-gray-300 dark:bg-gray-800"
        >
          <ImGithub className="inline h-5 w-5" />
          sign in with Github
        </button>
      </div>
      <p className="h-[1px] w-full relative mt-6 bg-gray-300 ">
        <span className="absolute -top-3 left-[151px] bg-lightGray px-1 dark:bg-darkGray">
          or use Email
        </span>
      </p>
      <form
        onSubmit={(e) => signInHandler(e)}
        className="h-fit w-full flex flex-col items-center"
      >
        <div className="h-10 w-full relative mt-8">
          <input
            type="text"
            name="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
            className="h-10 w-full border-[2px] border-gray-200 dark:border-gray-500 bg-lightGray outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
          />
          <label
            htmlFor="email"
            className="absolute bg-lightGray rounded-md px-[2px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
          >
            email
          </label>
        </div>
        <div className="h-10 w-full relative mt-4">
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
            className="h-10 w-full border-[2px] border-gray-200 dark:border-gray-500 bg-lightGray outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
          />
          <label
            htmlFor="password"
            className="absolute bg-lightGray rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
          >
            password
          </label>
        </div>
        <div className="w-full flex justify-between mt-1">
          <p className=" text-red-500 text-sm">{err}</p>
          <Link href={"/reset"} className="px-1 text-blue-600 text-sm">
            Forgot Password?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-xl font-semibold bg-darkGray text-gray-50 mt-4 transition-all active:scale-95 dark:bg-gray-100 dark:text-gray-900 "
        >
          Sign In
        </button>
        <p className="text-sm mt-2">
          Dont have account?
          <Link href={"/signup"} className="text-blue-600">
            Sign Up
          </Link>
        </p>
      </form>
    </main>
  );
};

export default SignIn;
