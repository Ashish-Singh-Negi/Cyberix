"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

import { MdStar } from "react-icons/md";

import ProductImages from "@/app/components/ProductImage";

import Rating from "./Rating";
import ReviewsCard from "./ReviewsCard";

import AddToCartBtn, { BuyNowBtn } from "@/app/components/Btns";
import Loader from "@/app/components/Loader";

import { useUserInfoContext } from "@/contexts/userInfoContext";
import { useProductContext } from "@/contexts/productContext";

const MobileDetails = () => {
  const searchParams = useSearchParams();

  const { info } = useUserInfoContext();
  const { setProduct } = useProductContext();

  const category = searchParams.get("category");
  const name = searchParams.get("name");
  const pid = searchParams.get("pid");
  const storage = searchParams.get("storage");
  const memory = searchParams.get("memory");
  const searchParamsColor = searchParams.get("color");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [mobileDetails, setMobileDetails] = useState<MobileProps | null>(null);

  const [color, setColor] = useState<string>(searchParams.get("color")!);
  const [img, setImg] = useState<string>("");

  const [inStock, setInStock] = useState<number | null>(null);

  const [varient, setVarient] = useState<MobileVarient | null>(null);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  async function getMobileDetails(url: string, pid: string, retries: number) {
    try {
      setLoading(true);
      setError(false);

      const { data } = await axios.post(url, {
        productID: pid,
      });

      console.log(data);
      setMobileDetails(data.data);
      setProduct(data.data);
      setLoading(false);
    } catch (error) {
      if (retries > 0) {
        console.warn(`Retrying... (${retries} attempts left)`);
        return getMobileDetails(url, pid, retries - 1);
      }
      console.error(error);
      setError(true);
    }
  }

  useEffect(() => {
    const id = setTimeout(() => {
      getMobileDetails(`/api/product/${category}/get`, pid!, 5);
    }, 1000);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    setColor(searchParamsColor!);
  }, [searchParamsColor]);

  useEffect(() => {
    mobileDetails?.color.map((element) => {
      if (color === element.color) {
        setImg(element.imgURLs[0]);
      }
    });
  }, [color, mobileDetails]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!mobileDetails) return;

    let foundVarient = null;
    for (const value of mobileDetails.varients) {
      if (memory === value.memory && storage === value.storage) {
        foundVarient = value;
        const stockInfo = value.inStock.find(
          (inStock) => inStock.color === color
        );
        setInStock(stockInfo ? stockInfo.stock : null);
        break;
      }
    }
    if (!foundVarient) {
      setVarient(null);
      setInStock(null);
    } else {
      setVarient(foundVarient);
    }
  }, [color, memory, storage, mobileDetails]);

  const smallViewport = (
    <div className="top-0 h-[420px] w-full flex">
      <div className="h-[420px] w-[460px] flex flex-col">
        {img && (
          <Image
            className="h-[320px] w-[320px] border-gray-300 mx-auto"
            src={img}
            alt="Image"
            height={416}
            width={416}
          />
        )}
        <div
          className={`h-[86px] mr-1 overflow-x-auto flex flex-col flex-wrap`}
        >
          {mobileDetails && (
            <ProductImages
              colorsImgs={mobileDetails.color}
              defaultImgs={mobileDetails.defaultImgs!}
              color={color}
              img={img!}
              setImg={setImg}
            />
          )}
        </div>
        <div className="absolute bg-white dark:bg-gray-950 bottom-0 h-12 text-lg font-semibold flex items-center gap-3">
          <AddToCartBtn
            pid={pid!}
            brandName={mobileDetails?.brandName!}
            productName={mobileDetails?.productName!}
            color={color}
            varient={varient!}
            imgs={mobileDetails?.color!}
            isBuying={false}
          />
          <BuyNowBtn
            pid={pid!}
            brandName={mobileDetails?.brandName!}
            productName={mobileDetails?.productName!}
            color={color}
            varient={varient!}
            imgs={mobileDetails?.color!}
            isBuying={true}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main
          className={`h-full w-full box-border lg:flex lg:flex-row pt-6 pb-4 gap-10 overflow-y-auto`}
        >
          {windowWidth <= 460 ? (
            smallViewport
          ) : (
            <div className="lg:sticky top-0 h-[500px] w-[600px]  flex">
              <div className={`h-[500px] w-[86px] mr-1 ml-8 overflow-y-auto`}>
                {mobileDetails && (
                  <ProductImages
                    colorsImgs={mobileDetails.color}
                    defaultImgs={mobileDetails.defaultImgs!}
                    color={color}
                    img={img!}
                    setImg={setImg}
                  />
                )}
              </div>
              <div className="h-[500px] w-[416px]  flex flex-col">
                {img && (
                  <Image
                    className="border-gray-300 h-[416px] w-[416px]"
                    src={img}
                    alt="Image"
                    height={416}
                    width={416}
                  />
                )}
                <div className="h-[84px] w-full text-lg font-semibold flex items-center gap-2">
                  <AddToCartBtn
                    pid={pid!}
                    brandName={mobileDetails?.brandName!}
                    productName={mobileDetails?.productName!}
                    color={color}
                    varient={varient!}
                    imgs={mobileDetails?.color!}
                    isBuying={false}
                  />
                  <BuyNowBtn
                    pid={pid!}
                    brandName={mobileDetails?.brandName!}
                    productName={mobileDetails?.productName!}
                    color={color}
                    varient={varient!}
                    imgs={mobileDetails?.color!}
                    isBuying={true}
                  />
                </div>
              </div>
            </div>
          )}
          <main className="h-fit w-full overflow-y-auto">
            <p className="text-xl font-medium">
              {mobileDetails?.brandName} {mobileDetails?.productName} ( {color}{" "}
              , {storage} Storage) ( {memory} RAM )
            </p>
            <p className="font-medium text-gray-500 text-sm mt-[6px] dark:text-gray-400 mb-2">
              <span className="h-5 mr-[2px] bg-blue-500 text-white px-1 py-[2px] rounded-md inline-flex gap-[2px] items-center">
                {mobileDetails?.rating}
                <MdStar className="inline" />
              </span>{" "}
              {mobileDetails?.rating} ratings & {mobileDetails?.reviews.length}{" "}
              reviews
            </p>
            {/** Price Container */}
            <div className="font-semibold text-gray-700 flex items-end gap-2 tracking-wide dark:text-gray-200">
              {varient?.salePrice ? (
                <p className="text-3xl flex items-start gap-1">
                  <span className="text-lg ">&#8377;</span>
                  {varient?.salePrice}
                </p>
              ) : (
                <p className="text-3xl text-red-400">Not Available</p>
              )}

              {varient?.mrp && (
                <p className="h-full text-base line-through text-gray-500 flex items-end">
                  <span>&#8377;</span>
                  {varient?.mrp}
                </p>
              )}

              {inStock! < 5 && inStock !== null && (
                <span className="text-red-500 text-xl">
                  Only {inStock} left
                </span>
              )}
            </div>
            {/* color options And Varient container */}
            <div className="lg:h-[60px] h-fit w-full mt-4">
              <div className="h-full w-full flex">
                <div className="h-full w-[120px]">
                  <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                    Color
                  </span>
                </div>
                <div className="w-fit mt-2 flex flex-wrap">
                  {mobileDetails?.color.map((value, index) => (
                    <Link
                      key={index}
                      href={`?category=${category}&name=${name}&color=${value.color}&storage=${storage}&memory=${memory}&pid=${pid}`}
                      className={`h-10 px-4 flex font-semibold items-center border-2 rounded-sm mr-3 ${
                        color === value.color &&
                        "border-blue-500  dark:bg-gray-950 tracking-wide"
                      }`}
                    >
                      {value.color}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {mobileDetails?.rams.length !== 1 && (
              <div className="lg:h-[60px] h-fit w-full mt-4">
                <div className="h-full w-full flex">
                  <div className="h-full w-[120px]">
                    <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                      RAM
                    </span>
                  </div>
                  <div className="w-fit mt-2 flex flex-wrap">
                    {mobileDetails?.rams.map((ram) => (
                      <Link
                        key={ram}
                        href={`?category=${category}&name=${name}&color=${color}&storage=${storage}&memory=${ram}&pid=${pid}`}
                        className={`h-9 px-5 border-2 rounded-sm flex items-center justify-center mr-3  ${
                          memory === ram && "border-blue-500  dark:bg-gray-950"
                        }`}
                      >
                        <p className="font-semibold text-xs">{ram}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="lg:h-[60px] h-fit w-full mt-4">
              <div className="h-full w-full flex">
                <div className="h-full w-[120px]">
                  <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                    Storage
                  </span>
                </div>
                <div className="w-fit mt-2 flex flex-wrap">
                  {mobileDetails?.storages.map((stor) => (
                    <Link
                      key={stor}
                      href={`?category=${category}&name=${name}&color=${color}&storage=${stor}&memory=${memory}&pid=${pid}`}
                      className={`h-9 px-5 border-2 rounded-sm flex items-center justify-center mr-3  ${
                        storage === stor && "border-blue-500  dark:bg-gray-950"
                      }`}
                    >
                      <p className="font-semibold text-xs">{stor}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/** Specs container */}
            <div className="h-fit w-full mt-4">
              <div className="h-full w-full flex items-start">
                <div className="h-full w-[135px]">
                  <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                    Key Features
                  </span>
                </div>
                {
                  <ul className="list-disc text-gray-800  text-sm">
                    {mobileDetails?.highlights.map((value) => (
                      <li
                        className="text-gray-600 dark:text-gray-300 mt-1"
                        key={value}
                      >
                        {value}
                      </li>
                    ))}
                  </ul>
                }
              </div>
            </div>
            <div className="h-fit w-full border-[1px] rounded-t-md dark:border-custom mt-4">
              <p className="h-[60px] md:text-2xl text-lg font-semibold pt-6 px-6 flex justify-between">
                Ratings & Reviews
                <Link
                  href={`${
                    info
                      ? `/${category}/write-review?name=${mobileDetails?.productName}&color=${color}&storage=${varient?.storage}&memory=${varient?.memory}&color=${color}&pid=${pid}`
                      : `/signin`
                  }`}
                  className="md:px-4 py-1 md:text-lg px-2 bg-gray-950 text-white dark:bg-white dark:text-gray-950 rounded-md active:scale-95 transition-all"
                >
                  Rate Product
                </Link>
              </p>
              <Rating
                rating={mobileDetails?.rating!}
                totalReviews={mobileDetails?.reviews.length!}
                reviews={mobileDetails?.reviews!}
              />
            </div>
            {mobileDetails?.reviews.map((review) => (
              <ReviewsCard
                userid={info?.userId!}
                user={info?.username!}
                key={review.username}
                pid={pid!}
                rid={review._id}
                rating={review.rating}
                username={review.username}
                heading={review.heading}
                review={review.review}
                likes={review.likes}
                dislikes={review.dislikes}
                createdAt={review.createdAt}
              />
            ))}
          </main>
        </main>
      )}
    </>
  );
};

export default MobileDetails;
