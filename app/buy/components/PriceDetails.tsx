import Link from "next/link";
import React from "react";

type PriceProps = {
  NoOfItems: number;
  totalAmount: number;
  discount: number;
};

const PriceDetails = ({ NoOfItems, totalAmount, discount }: PriceProps) => {
  return (
    <div className="h-fit w-[420px] px-4 py-2 bg-white dark:bg-gray-950">
      <h1 className="text-xl font-medium">PRICE DETAILS</h1>
      <p className="text-base mt-6 flex justify-between ">
        Price ({NoOfItems} item) <span>₹{totalAmount}</span>
      </p>
      <p className="text-base mt-4 flex justify-between">
        Discount
        <span className="text-green-500 dark:text-green-400 text-base tracking-wide">
          ₹{discount}
        </span>
      </p>
      <p className="text-base mt-4 flex justify-between">
        Delivery Charges
        {false ? (
          <span className="text-base tracking-wide">₹20</span>
        ) : (
          <span className="text-green-400 tracking-wider">Free</span>
        )}
      </p>
      <p className="text-lg my-4 border-y-[1px] py-2 flex justify-between px-1 border-custom font-semibold">
        Total Payable <span>₹{totalAmount}</span>
      </p>
    </div>
  );
};

export default PriceDetails;
