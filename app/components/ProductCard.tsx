"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { MdStar } from "react-icons/md";

const ProductCard = ({
  pid,
  category,
  brandName,
  productName,
  color,
  varient,
  highlights,
  reviews,
  rating,
  img,
}: ProductCardProps) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    switch (category) {
      case "mobile":
        setUrl(
          `/mobile/details?category=${category}&name=${productName}&color=${color}&storage=${varient.storage}&memory=${varient.memory}&pid=${pid}`
        );
        break;

      // case "laptop":
      //   setUrl(
      //     `/laptop/details?category=${category}&name=${productName}&cpu=${varient.processor}&gpu=${varient.gpu}&color=${color}&storage=${varient.storage}&memory=${varient.memory}&pid=${pid}`
      //   );
      //   break;

      default:
        setUrl("/not-found");
        break;
    }
  }, []);

  return (
    <Link
      href={url}
      className="h-fit w-[98%] bg-white dark:bg-gray-950 border-[1px] dark:border-none rounded-xl flex gap-4 p-6 box-border cursor-pointer transition-all duration-300 active:scale-95 hover:shadow-md"
    >
      <div className="h-40 w-48 md:h-64 md:w-72 flex justify-center items-center transition-all ">
        <Image
          src={img}
          alt="product images"
          height={160}
          width={144}
          className="h-40 w-36 md:h-64 md:w-[220px] rounded-xl"
        />
      </div>

      <div className="h-full w-3/4">
        <p className="font-semibold group-hover:text-blue-500 transition-colors">
          {brandName} {productName} ({color} , {varient.storage}){" "}
          {varient.memory}
        </p>
        <p className="font-medium flex gap-[6px] text-gray-500 text-sm mt-1 dark:text-gray-400">
          <span className="h-5 bg-blue-600 text-white px-1 rounded-md inline-flex gap-[2px] items-center ">
            {rating}
            <MdStar className="inline" />
          </span>{" "}
          {rating} ratings & {reviews.length} reviews
        </p>
        <ul className="list-disc ml-5 mt-3 text-sm hidden md:block">
          {highlights.map((val) => (
            <li key={val}> {val}</li>
          ))}
        </ul>
        <p className="text-3xl font-semibold text-gray-700 dark:text-gray-200 flex mt-2">
          <span className="text-lg mr-[2px]">&#8377;</span>
          {varient.salePrice}
          <span>
            <span className="ml-3 text-xs line-through text-gray-500">
              <span className="text-base">&#8377;</span>
              {varient.mrp}
            </span>
          </span>
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
