import React from "react";

import SignIn from "./components/SignIn";

const LoginPage = () => {
  return (
    <div className="w-full h-full absolute bg-lightGray dark:bg-darkGray flex justify-center items-center ">
      <SignIn />
    </div>
  );
};

export default LoginPage;
