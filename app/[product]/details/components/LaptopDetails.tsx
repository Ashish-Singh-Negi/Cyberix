import React from "react";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { MdStar } from "react-icons/md";
// import { MdOutlineEdit } from "react-icons/md";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import { LaptopProps } from "@/lib/definations";

import ReviewsCard from "./ReviewsCard";
import Rating from "./Rating";
import ProductImages from "@/app/components/ProductImage";
import Loader from "@/app/components/Loader";
import AddToCartBtn, { BuyNowBtn } from "@/app/components/Btns";
import { useUserInfoContext } from "@/contexts/userInfoContext";

const LaptopDetails = () => {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const name = searchParams.get("name");
  const pid = searchParams.get("pid");
  const storage = searchParams.get("storage");
  const memory = searchParams.get("memory");
  const cpu = searchParams.get("cpu");
  const gpu = searchParams.get("gpu");

  const { info } = useUserInfoContext();

  const [laptopDetails, setlaptopDetails] = useState<LaptopProps | null>(null);

  const [color, setColor] = useState<string>(searchParams.get("color")!);
  const [img, setImg] = useState<string>("");

  const [mrp, setMRP] = useState<string | null>();
  const [salePrice, setSalePrice] = useState<string | null>();
  const [inStock, setInStock] = useState<number | null>(null);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      getLaptopDetails();
    }, 2000);
    return () => {
      clearTimeout(id);
    };
  }, []);

  const getLaptopDetails = async () => {
    try {
      setError(false);
      setLoading(true);
      const productID = searchParams.get("pid");
      const { data } = await axios.post(`/api/product/${category}/get`, {
        productID,
      });
      setlaptopDetails(data.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setColor(searchParams.get("color")!);
  }, [searchParams.get("color")]);

  useEffect(() => {
    laptopDetails?.color.map((element) => {
      if (color === element.color) {
        setImg(element.imgURLs[0]);
      }
    });
  }, [color, laptopDetails]);

  useEffect(() => {
    let temp = 0;

    laptopDetails?.varients.map((element) => {
      if (
        memory === element.memory &&
        storage === element.storage &&
        cpu === element.processor &&
        gpu === element.gpu
      ) {
        setSalePrice(element.salePrice);
        setMRP(element.mrp);
        element.inStock.forEach((inStock) => {
          if (color === inStock.color) {
            setInStock(inStock.stock);
          }
        });
      } else {
        temp++;
      }
      console.log(element);
    });

    if (temp === laptopDetails?.varients.length) {
      setSalePrice(null);
      setMRP(null);
      setInStock(null);
    }
  }, [memory, storage, color, cpu, gpu, laptopDetails]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main
          className={`h-full w-full box-border flex pt-6 pb-4 gap-10 overflow-y-auto`}
        >
          <div className="sticky top-0 h-[500px] w-[600px] flex">
            <div className={`h-[500px] w-[86px] mr-1 ml-8 overflow-y-auto`}>
              {laptopDetails && (
                <ProductImages
                  colorsImgs={laptopDetails.color}
                  defaultImgs={laptopDetails.defaultImgs!}
                  color={color}
                  img={img}
                  setImg={setImg}
                />
              )}
            </div>
            <div className="h-[500px] w-[416px] flex flex-col">
              <Image
                className="border-gray-300 h-[416px] w-[416px] "
                src={img}
                alt="Image"
                height={416}
                width={416}
              />
              <div className="h-[84px] w-full text-lg font-semibold flex items-center gap-2">
                {/* <AddToCartBtn  /> */}
                {/* <BuyNowBtn varient={} /> */}
              </div>
            </div>
          </div>
          <main className="h-fit w-full overflow-y-auto">
            <p className="text-xl font-medium">
              {laptopDetails?.brandName} {laptopDetails?.productName} ( {color}{" "}
              , {storage} Storage) ( {memory} RAM ) , {laptopDetails?.display}
            </p>
            <p className="font-medium text-gray-500 text-sm mt-[6px] dark:text-gray-400">
              <span className="h-5 bg-blue-500 text-white px-1 py-[2px] rounded-md inline-flex items-center">
                {laptopDetails?.rating}
                <MdStar className="inline" />
              </span>{" "}
              {laptopDetails?.rating} rating & {laptopDetails?.reviews.length}
              reviews
            </p>
            {/** Price Container */}
            <div className="font-semibold text-gray-700 flex items-end gap-2 mt-2 tracking-wide dark:text-gray-200">
              {salePrice ? (
                <p className="text-3xl flex items-start gap-1">
                  <span className="text-lg ">&#8377;</span>
                  {salePrice}
                </p>
              ) : (
                <p className="text-3xl text-red-400">Not Available</p>
              )}

              {mrp && (
                <p className="h-full text-base line-through text-gray-500 flex items-end">
                  <span>&#8377;</span>
                  {mrp}
                </p>
              )}

              {inStock! < 5 && inStock !== null && (
                <span className="text-red-500 text-xl">
                  Only {inStock} left
                </span>
              )}
            </div>
            {/* color options And Varient container */}
            <div className="h-[60px] w-full mt-4">
              <div className="h-full w-full flex">
                <div className="h-full w-[120px]">
                  <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                    Color
                  </span>
                </div>
                {laptopDetails?.color.map((value, index) => (
                  <Link
                    key={index}
                    href={`?category=${category}&name=${name}&cpu=${cpu}&gpu=${gpu}&color=${value.color}&storage=${storage}&memory=${memory}&pid=${pid}`}
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
            {laptopDetails?.processors.length! > 1 ? (
              <div className="h-[60px] w-full mt-4">
                <div className="h-full w-full flex">
                  <div className="h-full w-[120px]">
                    <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                      CPU
                    </span>
                  </div>
                  {laptopDetails?.processors.map((processor) => (
                    <Link
                      key={processor}
                      href={`?category=${category}&name=${name}&cpu=${processor}&gpu=${gpu}&color=${color}&storage=${storage}&memory=${memory}&pid=${pid}`}
                      className={`h-9 px-5 border-2 rounded-sm flex items-center justify-center mr-3  ${
                        cpu === processor && "border-blue-500  dark:bg-gray-950"
                      }`}
                    >
                      <p className="font-semibold text-xs">{processor}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
            {laptopDetails?.rams.length !== 1 && (
              <div className="h-[60px] w-full mt-4">
                <div className="h-full w-full flex">
                  <div className="h-full w-[120px]">
                    <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                      RAM
                    </span>
                  </div>
                  {laptopDetails?.rams.map((ram) => (
                    <Link
                      key={ram}
                      href={`?category=${category}&name=${name}&cpu=${cpu}&gpu=${gpu}&color=${color}&storage=${storage}&memory=${ram}&pid=${pid}`}
                      className={`h-9 px-5 border-2 rounded-sm flex items-center justify-center mr-3  ${
                        memory === ram && "border-blue-500  dark:bg-gray-950"
                      }`}
                    >
                      <p className="font-semibold text-xs">{ram}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {laptopDetails?.storages.length! > 1 && (
              <div className="h-[60px] w-full mt-4">
                <div className="h-full w-full flex">
                  <div className="h-full w-[120px]">
                    <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                      Storage
                    </span>
                  </div>
                  {laptopDetails?.storages.map((stor) => (
                    <Link
                      key={stor}
                      href={`?category=${category}&name=${name}&cpu=${cpu}&gpu=${gpu}&color=${color}&storage=${stor}&memory=${memory}&pid=${pid}`}
                      className={`h-9 px-5 border-2 rounded-sm flex items-center justify-center mr-3  ${
                        storage === stor && "border-blue-500  dark:bg-gray-950"
                      }`}
                    >
                      <p className="font-semibold text-xs">{stor}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {laptopDetails?.gpus.length! > 1 && (
              <div className="h-[60px] w-full mt-4">
                <div className="h-full w-full flex">
                  <div className="h-full w-[120px]">
                    <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                      Graphic Card
                    </span>
                  </div>
                  {laptopDetails?.processors.map((graphic) => (
                    <Link
                      key={graphic}
                      href={`?category=${category}&name=${name}&cpu=${cpu}&gpu=${graphic}&color=${color}&storage=${storage}&memory=${memory}&pid=${pid}`}
                      className={`h-9 px-5 border-2 rounded-sm flex items-center justify-center mr-3  ${
                        gpu === graphic && "border-blue-500  dark:bg-gray-950"
                      }`}
                    >
                      <p className="font-semibold text-xs">{graphic}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/** Specs container */}
            <div className="h-fit w-full mt-2">
              <div className="h-full w-full flex items-start">
                <div className="h-full w-[140px]">
                  <span className="h-full w-20 font-semibold text-sm text-gray-600 dark:text-gray-300">
                    Key Features
                  </span>
                </div>
                <ul className="list-disc w-[80%] text-gray-800  text-sm">
                  {laptopDetails?.highlights.map((value) => (
                    <li
                      className="text-gray-600 dark:text-gray-300 mt-1"
                      key={value}
                    >
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="h-fit w-full border-[1px] rounded-t-md dark:border-custom pr-8 mt-4">
              <p className="text-2xl font-semibold pt-6 pl-6">
                Ratings & Reviews
              </p>
              <Rating
                rating={laptopDetails?.rating!}
                reviews={laptopDetails?.reviews!}
                noOfReviews={laptopDetails?.reviews.length!}
              />
            </div>
            {laptopDetails?.reviews.map((review) => (
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
                // likedBy={review.likedBy}
                // dislikedBy={review.dislikedBy}
                createdAt={review.createdAt}
              />
            ))}
          </main>
        </main>
      )}
    </>
  );
};

export default LaptopDetails;
