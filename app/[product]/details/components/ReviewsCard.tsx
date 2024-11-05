"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import axios from "axios";
import toast from "react-hot-toast";

import { MdStar, MdThumbDown, MdThumbUp } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

import { useUserInfoContext } from "@/contexts/userInfoContext";
import Review from "./Review";

const oneSecondInMs = 1000;
const oneMinuteInMs = 60 * oneSecondInMs;
const oneHourInMs = 60 * oneMinuteInMs;
const oneDayInMs = 24 * oneHourInMs;
const oneWeekInMs = 7 * oneDayInMs;
const oneMonthInMs = 30 * oneDayInMs;
const oneYearInMs = 365 * oneDayInMs;

type ReviewType = Omit<Reviews, "_id"> & {
  rid: string;
  pid: string;
  user: string | null;
  userid: string;
};

const ReviewsCard = ({
  userid,
  user,
  pid,
  rid,
  rating,
  username,
  heading,
  review,
  likes,
  dislikes,
  createdAt,
}: ReviewType) => {
  const { refresh } = useRouter();

  // const { info } = useUserInfoContext(); 

  const product = useSearchParams().get("category");

  const [reviewTime, setReviewTime] = useState("");

  const [liked, setLiked] = useState(likes);
  const [disliked, setDisliked] = useState(dislikes);

  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);

  const [editToggle, setEditToggle] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const reviewTime = new Date(createdAt).getTime();
    const currentTime = new Date(new Date().toISOString()).getTime();

    calcuTime(currentTime, reviewTime);

    if (user === username) {
      setEdit(true);
    }

    likes.forEach((element) => {
      if (element === userid) setIsLiked(true);
    });

    dislikes.forEach((element) => {
      if (element === userid) setIsDisLiked(true);
    });
  }, []);

  useEffect(() => {
    voteHandler(liked, disliked);
  }, [liked, disliked, isLiked, isDisLiked]);

  const voteHandler = async (likes: string[], dislikes: string[]) => {
    try {
      const { data } = await axios.put("/api/product/mobile/review/vote", {
        pid,
        rid,
        likes,
        dislikes,
      });

      toast.success(data.message); // Remove this Toast Before Build
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const removeReviewhandler = async () => {
    try {
      const { data } = await axios.delete(`/api/product/mobile/review/delete`, {
        params: {
          pid: pid,
          rid: rid,
        },
      });

      console.log(data);

      toast.success(data.message); // Page main Component should Refreshed
    } catch (error: any) {
      console.log(error.message);
    }

    updateRating();
  };

  const updateRating = async () => {
    let ratingIs = 0;

    try {
      const { data } = await axios.get("/api/product/mobile/review/get", {
        params: {
          pid,
        },
      });

      const reviews: Reviews[] = data.data.reviews;

      console.log("Reviews : ", data);

      reviews.map((value) => {
        ratingIs += value.rating;
      });

      ratingIs = ratingIs / reviews.length;
    } catch (error) {
      console.log(error);
      throw error;
    }

    try {
      const { data } = await axios.put(`/api/product/${product}/rate`, {
        pid,
        rating: Number(ratingIs.toFixed(1)),
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
    refresh();
  };

  const calcuTime = (currentTime: number, reviewTime: number) => {
    const timeIs = currentTime - reviewTime;

    if (timeIs > oneYearInMs) {
      setReviewTime(`${Math.round(timeIs / oneYearInMs)} year`);
    } else if (timeIs > oneMonthInMs) {
      setReviewTime(`${Math.round(timeIs / oneMonthInMs)} month`);
    } else if (timeIs > oneWeekInMs) {
      setReviewTime(`${Math.round(timeIs / oneWeekInMs)} week`);
    } else if (timeIs > oneDayInMs) {
      setReviewTime(`${Math.round(timeIs / oneDayInMs)} day`);
    } else if (timeIs > oneHourInMs) {
      setReviewTime(`${Math.round(timeIs / oneHourInMs)} hour`);
    } else if (timeIs > oneMinuteInMs) {
      setReviewTime(`${Math.round(timeIs / oneMinuteInMs)} minute`);
    } else {
      setReviewTime(`${Math.round(timeIs / oneSecondInMs)} seconds`);
    }
  };

  return (
    <div className="h-fit w-full p-6 border-x-[1px] border-b-[1px] dark:border-custom">
      <h1 className="h-5 w-full flex items-center font-medium justify-between">
        <div>
          <span className="h-5 px-[5px] bg-blue-500 rounded-md py-[2px] inline-flex items-center mr-3 text-white text-xs">
            {rating}
            <MdStar size={12} className="inline ml-[2px]" />
          </span>
          {heading}
        </div>
        {edit && (
          <button
            onClick={removeReviewhandler}
            className="text-red-400 active:scale-95"
          >
            remove
          </button>
        )}
      </h1>
      {editToggle ? (
        <textarea
          value={review}
          key={`review-${review.length}`}
          className={`h-80 w-full resize-y my-4 border-[2px] border-gray-200 dark:border-gray-500 bg-lightGray outline-none transition-colors duration-[0.3s] focus:border-blue-500 p-2 rounded-lg dark:bg-gray-900 dark:focus:border-blue-500`}
        ></textarea>
      ) : (
        <Review key={`review-no${review.length}`} review={review} />
      )}
      <div className="h-6 w-full flex justify-between">
        <p className="h-full w-full flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
          {username}{" "}
          <span className="ml-3 text-xs text-gray-400 dark:text-gray-500">
            {reviewTime} ago
          </span>
        </p>
        <div
          className={`${
            edit ? "w-40" : "w-24"
          }  flex gap-4 text-gray-600 dark:text-gray-300`}
        >
          {edit && (
            <button
              onClick={() => setEditToggle(!editToggle)}
              className={`w-10 text-sm cursor-pointer ${
                editToggle ? "text-blue-400" : "text-gray-400"
              }`}
            >
              <RiEdit2Fill size={18} className={`inline transition-all`} />
            </button>
          )}
          <button
            onClick={() => {
              if (userid) {
                if (isLiked) {
                  setIsDisLiked(false);
                  setLiked((prev) => {
                    prev.map((val, i) => {
                      if (val === userid) {
                        prev.splice(i, 1);
                      }
                    });

                    return prev;
                  });
                  setIsLiked(false);
                } else {
                  setIsDisLiked(false);
                  setLiked((prev) => [...prev, userid]);
                  setIsLiked(true);
                }

                if (disliked) {
                  setDisliked((prev) => {
                    prev.map((val, i) => {
                      if (val === userid) {
                        prev.splice(i, 1);
                      }
                    });

                    return prev;
                  });
                }
              }
            }}
            className="w-10 text-sm cursor-pointer flex gap-1 items-center"
          >
            <MdThumbUp
              size={18}
              className={`inline transition-all ${
                isLiked ? "text-blue-400" : "text-gray-400"
              }`}
            />
            {liked.length}
          </button>
          <button className="w-10 text-sm cursor-pointer flex gap-1 items-center">
            <MdThumbDown
              size={18}
              onClick={() => {
                if (userid) {
                  if (isDisLiked) {
                    setIsLiked(false);
                    setDisliked((prev) => {
                      prev.map((val, i) => {
                        if (val === userid) {
                          prev.splice(i, 1);
                        }
                      });

                      return prev;
                    });
                    setIsDisLiked(false);
                  } else {
                    setIsLiked(false);
                    setDisliked((prev) => [...prev, userid]);
                    setIsDisLiked(true);
                  }

                  if (isLiked) {
                    setLiked((prev) => {
                      prev.map((val, i) => {
                        if (val === userid) {
                          prev.splice(i, 1);
                        }
                      });

                      return prev;
                    });
                  }
                }
              }}
              className={`inline transition-all mt-1 ${
                isDisLiked ? "text-blue-400" : "text-gray-400"
              }`}
            />
            {disliked.length}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCard;
