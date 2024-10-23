"use client";

import Input from "@/app/components/Input";
import axios from "axios";
import React, { useState } from "react";

const AddressForm = ({ progressbarBtn }: { progressbarBtn: () => void }) => {
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [pincode, setPincode] = useState("");
  const [locality, setLocality] = useState("");
  const [address, setAddress] = useState("");

  const submitDeliveryAddressHandler = async () => {
    progressbarBtn();
    try {
      const { data } = await axios.post("/api/user/profile/update", {
        name,
        phoneNumber: parseInt(phoneNum),
        pincode: parseInt(pincode),
        locality,
        address,
      });
      console.log("Hitted");
      console.log(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      {" "}
      <form className="h-fit w-full p-8 bg-white dark:bg-gray-950">
        <div className="h-full w-full flex gap-4">
          <Input
            name="Name"
            count={1}
            label="Name"
            state={name}
            setState={setName}
          />
          <Input
            name="phoneNum"
            count={1}
            label="10 Digit Phone Number"
            state={phoneNum}
            setState={setPhoneNum}
          />
        </div>
        <div className="h-full w-full flex gap-4 mt-6">
          <Input
            name="pincode"
            count={1}
            label="pincode"
            state={pincode}
            setState={setPincode}
          />
          <Input
            name="locality"
            count={1}
            label="locality"
            state={locality}
            setState={setLocality}
          />
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
      </form>
      <div className="h-10 w-full mt-6 flex justify-end">
        <button
          onClick={submitDeliveryAddressHandler}
          className=" px-6 py-2 bg-gray-950 font-semibold text-white dark:bg-white dark:text-gray-950 rounded-lg active:scale-95 transition-all"
        >
          DELIVER HERE
        </button>
      </div>
    </>
  );
};

export default AddressForm;
