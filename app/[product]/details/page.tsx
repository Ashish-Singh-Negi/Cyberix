"use client";

import React from "react";

import { useSearchParams } from "next/navigation";

import MobileDetails from "./components/MobileDetails";
import LaptopDetails from "./components/LaptopDetails";

const DetailsPage = () => {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  return (
    <div
      className={`h-full w-full bg-white dark:bg-gray-950 rounded-lg px-4 py-2 flex flex-col items-center overflow-y-auto`}
    >
      {category === "mobile" && <MobileDetails />}
      {category === "laptop" && <LaptopDetails />}
    </div>
  );
};

export default DetailsPage;
