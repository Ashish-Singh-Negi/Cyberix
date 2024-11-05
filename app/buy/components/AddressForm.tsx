"use client";

import { useUserInfoContext } from "@/contexts/userInfoContext";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddressForm = ({ progressbarBtn }: { progressbarBtn: () => void }) => {
  const { info } = useUserInfoContext();

  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [pincode, setPincode] = useState("");
  const [locality, setLocality] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!info?.address) return;
    setName(info?.address?.name);
    setPhoneNum(
      info.address.phoneNumber ? info.address.phoneNumber.toString() : ""
    );
    setPincode(info.address.pincode ? info.address.pincode.toString() : "");
    setLocality(info.address.locality);
    setAddress(info.address.address);
  }, []);

  const submitDeliveryAddressHandler = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const { data } = await axios.put("/api/user/profile/update", {
        name,
        phoneNumber: parseInt(phoneNum),
        pincode: parseInt(pincode),
        locality,
        address,
      });

      console.log(data);
      progressbarBtn();
    } catch (error: any) {
      console.error(error);
      toast.error("An error occured");
    }
  };

  return (
    <form onSubmit={submitDeliveryAddressHandler}>
      <main className="h-fit w-full p-8 bg-white dark:bg-gray-950">
        <div className="h-full w-full flex gap-4">
          <div className="h-10 w-full relative flex ">
            <input
              type="string"
              name="name"
              value={name}
              id="name"
              onChange={(e) => setName(e.target.value)}
              required
              className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500"
            />
            <label
              htmlFor={`name`}
              className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
            >
              Name
            </label>
          </div>
          <div className="h-10 w-full relative flex ">
            <input
              type="number"
              value={phoneNum}
              name="phnumber"
              id="phnumber"
              onChange={(e) => setPhoneNum(e.target.value)}
              required
              className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500"
            />
            <label
              htmlFor={`phnumber`}
              className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
            >
              Phone
            </label>
          </div>
        </div>
        <div className="h-full w-full flex gap-4 mt-6">
          <div className="h-10 w-full relative flex ">
            <input
              type="number"
              name={`pin-code`}
              id={`pin-code`}
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
              className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500"
            />
            <label
              htmlFor={`pin-code`}
              className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
            >
              Pincode
            </label>
          </div>
          <div className="h-10 w-full relative flex ">
            <input
              type="string"
              name={`locality`}
              id={`locality`}
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              required
              className="h-10 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500"
            />
            <label
              htmlFor={`locality`}
              className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
            >
              Locality
            </label>
          </div>
        </div>
        <div className="h-20 w-full relative flex mt-6">
          <textarea
            name={`userAdd`}
            id={`userAdd`}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="h-20 py-2 w-full border-2 border-gray-300  dark:border-custom outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 resize-none"
          />
          <label
            htmlFor={`userAdd`}
            className="absolute bg-white rounded-md px-[1px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 dark:text-gray-300"
          >
            Address
          </label>
        </div>
      </main>
      <div className="h-10 w-full mt-6 flex justify-end">
        <button
          type="submit"
          className=" px-6 py-2 bg-gray-950 font-semibold text-white dark:bg-white dark:text-gray-950 rounded-lg active:scale-95 transition-all"
        >
          DELIVER HERE
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
