"use client";

import React, { useEffect, useState } from "react";

import AddressForm from "./components/AddressForm";
import PriceDetails from "./components/PriceDetails";
import Summary from "./components/Summary";
import Payment from "./components/Payment";
import SignIn from "../(auth)/signin/components/SignIn";

import { useUserInfoContext } from "@/contexts/userInfoContext";
import Completed from "./components/Completed";
import { usePriceContext } from "@/contexts/priceContext";

const PaymentPage = () => {
  const { info } = useUserInfoContext();
  const { noOfProducts, totalAmount, totalDiscount } = usePriceContext();

  const [progressBar, setProgressBar] = useState(0);
  const [progress, setProgress] = useState([
    {
      name: "Login",
      feildName: "LOGIN",
      status: false,
      progressBar: "w-[0%]",
      component: (
        <main className="h-fit w-full flex justify-center">
          <SignIn />
        </main>
      ),
      position: "-left-4",
    },
    {
      name: "Address",
      feildName: "ADDRESS",
      status: false,
      progressBar: "w-[35%]",
      component: <AddressForm progressbarBtn={incrementProgressBarState} />,
      position: "left-[32%]",
    },
    {
      name: "summary",
      feildName: "ORDER SUMMARY",
      status: false,
      progressBar: "w-[67%]",
      component: <Summary />,
      btnName: "CONTINUE",
      position: "right-[30%]",
    },
    {
      name: "Payment",
      feildName: "PAYMENT METHOD",
      status: false,
      progressBar: "w-[100%]",
      component: <Payment />,
      position: "-right-7",
    },
  ]);

  function incrementProgressBarState() {
    progress[progressBar].status = true;
    setProgressBar((prev) => prev + 1);
  }

  function decrementProgressBarState() {
    if (progressBar < 1) return;
    progress[progressBar].status = false;
    setProgressBar((prev) => prev - 1);
  }

  useEffect(() => {
    if (!info) {
      progress.map((val) => {
        val.status = false;
      });
      setProgressBar(0);
    }

    if (info?.userId && progressBar === 0) {
      progress[progressBar].status = true;
      setProgressBar(1);
    }

    if (info?.address && progressBar === 1) {
      progress[progressBar].status = true;
      setProgressBar((prev) => prev + 1);
    }
  }, [info, progressBar]);

  return (
    <main className="h-full w-full flex justify-center">
      <div className="h-full w-[90%]">
        <header className="h-40 w-full flex justify-center items-center">
          <div className="relative h-20 w-[900px] flex items-center ">
            <div className="absolute top-[36px] h-[12px] w-full bg-gray-200 rounded-lg"></div>
            <div
              className={`absolute top-[36px] h-[12px] ${progress[progressBar].progressBar} bg-green-400 rounded-lg transition-all`}
            ></div>
            {progress.map((val) => {
              return (
                <Completed
                  key={val.feildName}
                  name={val.name}
                  status={val.status}
                  position={val.position}
                />
              );
            })}
          </div>
        </header>
        <div className="h-fit w-full flex justify-between">
          <div className="h-full w-full px-6 ">
            <header className="h-10 w-full text-xl font-semibold bg-gray-950 dark:bg-white text-white dark:text-gray-950 flex items-center px-4">
              {progress[progressBar].feildName}
            </header>
            <main className="h-fit w-full p-8 bg-white dark:bg-gray-950">
              {progress[progressBar].component}
              {progress[progressBar].btnName && (
                <div className="h-10 w-full mt-6 flex justify-end">
                  <button
                    onClick={incrementProgressBarState}
                    className=" px-6 py-2 bg-gray-950 font-semibold text-white dark:bg-white dark:text-gray-950 rounded-lg active:scale-95 transition-all"
                  >
                    {progress[progressBar].btnName}
                  </button>
                </div>
              )}
            </main>
          </div>
          {progressBar > 1 && (
            <PriceDetails
              noOfItems={noOfProducts}
              discount={totalDiscount}
              totalAmount={totalAmount}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default PaymentPage;
