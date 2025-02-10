"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [passwordBar, setPasswordBar] = useState<number[] | null>(null);

  const [confirmPasswordBar, setConfirmPasswordBar] = useState<number[] | null>(
    null
  );

  const { push } = useRouter();

  const signUpHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !user.username ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      toast.error("All feilds are Necessary");
      return;
    }

    if (user.password !== user.confirmPassword) {
      toast.error("confirm password not match with password");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/user/signup", user);

      const { message, success } = res.data;

      if (success) {
        toast.success(message);
        setUser({ username: "", email: "", password: "", confirmPassword: "" });
        push("/signin");
        setLoading(false);
      } else {
        setErr(message);
      }
    } catch (error) {
      toast.error("SignUp Failed");
      console.error(error);
    }
  };

  const checkPasswordStrengthHandler = (
    passwordSize: number,
    setPasswordBar: React.Dispatch<SetStateAction<number[] | null>>
  ) => {
    setPasswordBar([0, 0, 0, 0]);

    if (passwordSize >= 20) setPasswordBar([1, 1, 1, 1]);
    else if (passwordSize >= 14) setPasswordBar([1, 1, 1, 0]);
    else if (passwordSize >= 10) setPasswordBar([1, 1, 0, 0]);
    else if (passwordSize >= 6) setPasswordBar([1, 0, 0, 0]);
  };

  const passwordOnChangeHandler = (password: string) => {
    const passwordSize = password.length;

    if (passwordSize == 0) {
      setUser({ ...user, password: password });
      setPasswordBar(null);
    }

    // check stength of password & change color of passwordBar accordingly
    checkPasswordStrengthHandler(passwordSize, setPasswordBar);

    const charASCII = password.charCodeAt(passwordSize - 1);

    if (charASCII >= 97 && charASCII <= 122) {
      setUser({ ...user, password: password });
    } else if (charASCII >= 65 && charASCII <= 90) {
      setUser({ ...user, password: password });
    } else if (charASCII >= 48 && charASCII <= 57) {
      setUser({ ...user, password: password });
    }
  };

  const confirmPasswordOnChangeHandler = (confirmPassword: string) => {
    const confirmPasswordSize = confirmPassword.length;

    if (confirmPasswordSize == 0) {
      setUser({ ...user, confirmPassword: confirmPassword });
      setConfirmPasswordBar(null);
    }

    // check stength of confirmPassword & change color of confirmPasswordBar accordingly
    checkPasswordStrengthHandler(confirmPasswordSize, setConfirmPasswordBar);

    // ASCII value of character
    const charASCII = confirmPassword.charCodeAt(confirmPasswordSize - 1);

    if (charASCII >= 97 && charASCII <= 122) {
      setUser({ ...user, confirmPassword: confirmPassword });
    } else if (charASCII >= 65 && charASCII <= 90) {
      setUser({ ...user, confirmPassword: confirmPassword });
    } else if (charASCII >= 48 && charASCII <= 57) {
      setUser({ ...user, confirmPassword: confirmPassword });
    }
  };

  return (
    <form
      onSubmit={signUpHandler}
      className="h-[640px] w-[500px] border-[1px] rounded-2xl border-custom flex gap-2 flex-col items-center box-border px-12"
    >
      <p className="text-3xl font-bold text-gray-800 dark:text-gray-50 mt-10 mb-2">
        Sign up
      </p>
      <div className="h-10 w-full relative mt-10">
        <input
          type="text"
          name="username"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          required
          className="h-10 w-full border-[2px] border-gray-200 dark:border-gray-500 bg-lightGray outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
        />
        <label
          htmlFor="username"
          className="absolute bg-lightGray rounded-md px-[2px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
        >
          username
        </label>
      </div>
      <div className="h-10 w-full relative mt-10">
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
        <div className="px-2 absolute w-full flex justify-start -bottom-5">
          <p className=" text-red-500 text-sm">{err}</p>
        </div>
      </div>
      <div className="h-10 w-full relative mt-8">
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={(e) => passwordOnChangeHandler(e.target.value)}
          required
          className="h-10 w-full border-[2px] border-gray-200 dark:border-gray-500 bg-lightGray outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
        />
        <label
          htmlFor="password"
          className="absolute bg-lightGray rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
        >
          password
        </label>
        {/* Password Strength Status Bar */}
        {passwordBar ? (
          <div className="px-2 absolute w-full flex justify-start bottom-0">
            {passwordBar.map((status, i) => (
              <span
                key={`password-bar-${i}`}
                className={`w-[100px] h-[2px] transition-all ${
                  status ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="h-10 w-full relative mt-8">
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          value={user.confirmPassword}
          onChange={(e) => confirmPasswordOnChangeHandler(e.target.value)}
          required
          className="h-10 w-full border-[2px] border-gray-200 dark:border-gray-500 bg-lightGray outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
        />
        <label
          htmlFor="confirm-password"
          className="absolute bg-lightGray rounded-md px-[1px] top-2 left-1 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
        >
          confirm password
        </label>
        {confirmPasswordBar ? (
          <div className="px-2 absolute w-full flex justify-start bottom-0">
            {confirmPasswordBar.map((status, i) => (
              <span
                key={`password-bar-${i}`}
                className={`w-[100px] h-[2px] transition-all ${
                  status ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
      <button
        type="submit"
        className="w-full py-2 rounded-xl bg-darkGray dark:bg-gray-100 dark:text-gray-900 font-semibold text-gray-50 mt-10 transition-all active:scale-95 "
      >
        Sign Up
      </button>
      <p className="text-sm mt-2">
        Alredy have account?
        <Link href={"/signin"} className="text-blue-600">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
