import Image from "next/image";
import React from "react";

import logo from "@/public/Designer.png";

const ResetPage = () => {
  return (
    <div className="w-full h-screen absolute bg-lightGray dark:bg-darkGray flex justify-center items-center ">
      <form
        action=""
        className="h-[500px] w-[500px] border-[1px] rounded-2xl border-custom flex gap-2 flex-col items-center box-border px-12"
      >

        <h1 className="text-4xl font-bold mt-20 mb-10">Cyberix.</h1>
        <h2 className="font-semibold text-2xl">Reset your password</h2>

        <div className="h-10 w-full relative mt-10">
          <input
            type="text"
            name="email"
            id="email"
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
            <p className=" text-red-500 text-sm">email not exist</p>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-xl bg-darkGray dark:bg-gray-100 dark:text-gray-900 font-semibold text-gray-50 mt-10 transition-all active:scale-95 "
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default ResetPage;
