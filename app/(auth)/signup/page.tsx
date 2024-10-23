import React from "react";
import SignUp from "./components/SignUp";

const RegisterPage = () => {
  return (
    <div className="w-full h-screen absolute bg-lightGray dark:bg-darkGray flex justify-center items-center ">
      <SignUp />
    </div>
  );
};

export default RegisterPage;
