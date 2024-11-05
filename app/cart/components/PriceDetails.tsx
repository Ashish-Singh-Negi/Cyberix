import { useCartContext } from "@/contexts/cartContext";
import { useUserInfoContext } from "@/contexts/userInfoContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

type PriceProps = {
  NoOfItems: number;
  totalAmount: number;
  discount: number;
};

const Price = ({ NoOfItems, totalAmount, discount }: PriceProps) => {
  const { info } = useUserInfoContext();
  const { itemsInCart } = useCartContext();

  const { push } = useRouter();

  const placeOrderHandler = async () => {
    console.log(itemsInCart);

    try {
      const { data } = await axios.put(`/api/user/cart/update`, {
        uid: info?.userId,
        isBuying: true,
      });

      console.log(data);

      push(`/buy`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full w-[350px] mt-6">
      <h1 className="text-xl font-medium">PAYMENT DETAILS</h1>
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
        Total Amount <span>₹{totalAmount}</span>
      </p>
      <button
        onClick={() => placeOrderHandler()}
        className={`h-12 w-full flex justify-center items-center cursor-pointer rounded-xl bg-gray-950 dark:bg-gray-50 text-gray-50 dark:text-gray-950 font-medium transition-all active:scale-95`}
      >
        Place Order
      </button>
    </div>
  );
};

export default Price;
