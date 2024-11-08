"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useUserInfoContext } from "@/contexts/userInfoContext";

import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { TiStarFullOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";
import { useProductContext } from "@/contexts/productContext";
import Loader from "@/app/components/Loader";

const WriteReviewPage = () => {
  const [stars, setStars] = useState(0);
  const [heading, setHeading] = useState("");
  const [review, setReview] = useState("");
  const [img, setImg] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  const { product } = useProductContext();
  const { info } = useUserInfoContext();

  const searchparams = useSearchParams();

  const { back, push } = useRouter();

  const pid = searchparams.get("pid");
  const color = searchparams.get("color");
  const memory = searchparams.get("memory");
  const storage = searchparams.get("storage");

  const createReviewHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`/api/product/mobile/review/create`, {
        pid: pid,
        username: info?.username,
        rating: stars,
        heading,
        review,
      });

      toast.success(data.message);
    } catch (error: any) {
      console.log(error.message);
    }

    updateRating();
  };

  useEffect(() => {
    if (!info || !product) return back();

    product?.color.map((element) => {
      if (color === element.color) {
        setImg(element.imgURLs[0]);
      }
    });

    setLoading(false);
  }, [info]);

  const updateRating = async () => {
    let ratingIs = 0;

    try {
      const { data } = await axios.get("/api/product/mobile/review/get", {
        params: {
          pid,
        },
      });

      if (data.data) {
        const reviews: Reviews[] = data.data.reviews;

        console.log("Reviews : ", data);

        reviews.map((value) => {
          ratingIs += value.rating;
        });

        ratingIs = ratingIs / reviews.length;
      }
    } catch (error: any) {
      console.log(error.message);
      throw error;
    }

    try {
      const { data } = await axios.put(
        `/api/product/${product?.category.toLowerCase()}/rate`,
        {
          pid,
          rating: Number(ratingIs.toFixed(1)),
        }
      );

      console.log(data);

      back();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="h-full w-full bg-white dark:bg-black px-6 pt-4 overflow-y-auto">
      <h1 className="text-3xl font-medium mb-5">Create Review</h1>
      <form
        onSubmit={createReviewHandler}
        className="h-fit w-full flex flex-col px-6"
      >
        <div className="h-20 w-full flex gap-6 items-center mb-4">
          <img className="h-20 w-20" src={img!} alt="Product Image" />
          <span className="h-16 w-[1px] bg-black dark:bg-white"></span>
          <p className="font-medium text-lg">
            {product?.brandName} {product?.productName} ( {color} , {storage}{" "}
            Storage) ( {memory} RAM )
          </p>
        </div>
        <div className="h-24 w-full border-y-[1px] py-3">
          <p className="text-xl font-normal mb-1">Overall Rating</p>
          <div className="h-10 w-fit flex text-4xl">
            {[1, 2, 3, 4, 5].map((val) => {
              let color = stars >= val ? "text-blue-600" : "text-gray-300";
              return stars >= val ? (
                <TiStarFullOutline
                  onClick={() => setStars(val)}
                  key={val}
                  className={`${color}`}
                />
              ) : (
                <TiStarOutline
                  onClick={() => setStars(val)}
                  key={val}
                  className={`${color} hover:text-blue-300`}
                />
              );
            })}
          </div>
        </div>
        <div className="h-28 w-full border-b-[1px] py-3">
          <p className="text-xl font-normal">Write a Heading</p>
          <div className="h-10 w-[600px] relative mt-3">
            <input
              type="text"
              name="heading"
              id="heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              required
              className="h-10 w-full border-[2px] border-gray-200 dark:border-gray-500 bg-lightGray outline-none transition-colors duration-[0.3s] focus:border-blue-500 px-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500 "
            />
            <label
              htmlFor="heading"
              className="absolute bg-lightGray rounded-md px-[2px] top-2 left-2 transition-all duration-[0.3s] cursor-pointer peer-valid:-translate-y-[18px] peer-valid:text-sm peer-valid:scale-90 peer-focus:-translate-y-[18px] peer-focus:text-sm peer-focus:scale-90 dark:bg-gray-900 text-gray-600 dark:text-gray-300"
            >
              heading
            </label>
          </div>
        </div>
        <div className="h-fit w-full border-b-[1px] py-3">
          <p className="text-xl font-normal">Write a Review</p>
          <textarea
            name="review"
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="What you like & dislike about the poduct?"
            className="h-24 w-[1000px] resize-y mt-2 border-[2px] border-gray-200 dark:border-gray-500 bg-lightGray outline-none transition-colors duration-[0.3s] focus:border-blue-500 p-2 rounded-lg peer dark:bg-gray-900 dark:focus:border-blue-500"
          ></textarea>
        </div>
        <div className="h-16 w-fit py-4 mb-10">
          <button
            type="submit"
            className="px-4 py-[6px] font-semibold rounded-lg bg-black text-white dark:bg-white dark:text-black transition-all active:scale-95"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteReviewPage;
