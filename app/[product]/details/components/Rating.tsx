import React, { useEffect, useState } from "react";

import { TiStarFullOutline } from "react-icons/ti";

const Rating = ({
  rating,
  totalReviews,
  reviews,
}: {
  rating: number;
  totalReviews: number;
  reviews: Reviews[];
}) => {
  const [counts, setCounts] = useState({
    five: 0,
    four: 0,
    three: 0,
    two: 0,
    one: 0,
  });
  const [bars, setBars] = useState({
    fifth: "0%",
    fourth: "0%",
    third: "0%",
    second: "0%",
    first: "0%",
  });

  useEffect(() => {
    const ratingsCount = { five: 0, four: 0, three: 0, two: 0, one: 0 };

    if (!reviews) return;

    reviews.map((review) => {
      if (review.rating === 5) ratingsCount.five++;
      else if (review.rating === 4) ratingsCount.four++;
      else if (review.rating === 3) ratingsCount.three++;
      else if (review.rating === 2) ratingsCount.two++;
      else if (review.rating === 1) ratingsCount.one++;
    });

    setCounts(ratingsCount);
  }, [reviews]);

  useEffect(() => {
    const calculateBarWidths = () => {
      const total = Object.values(counts).reduce(
        (prev, curr) => prev + curr,
        0
      );
      if (total === 0) return;

      let barsWidth: {
        fifth: string;
        fourth: string;
        third: string;
        second: string;
        first: string;
      };

      let highestRate;

      if (
        counts.five > counts.four &&
        counts.five > counts.three &&
        counts.five > counts.two &&
        counts.five > counts.one
      ) {
        highestRate = counts.five;
      } else if (
        counts.four > counts.five &&
        counts.four > counts.three &&
        counts.four > counts.two &&
        counts.four > counts.one
      ) {
        highestRate = counts.four;
      } else if (
        counts.three > counts.five &&
        counts.three > counts.four &&
        counts.three > counts.two &&
        counts.three > counts.one
      ) {
        highestRate = counts.three;
      } else if (
        counts.two > counts.five &&
        counts.two > counts.four &&
        counts.two > counts.three &&
        counts.two > counts.one
      ) {
        highestRate = counts.two;
      } else {
        highestRate = counts.one;
      }

      barsWidth = {
        fifth: `${(counts.five / highestRate) * 100}%`,
        fourth: `${(counts.four / highestRate) * 100}%`,
        third: `${(counts.three / highestRate) * 100}%`,
        second: `${(counts.two / highestRate) * 100}%`,
        first: `${(counts.one / highestRate) * 100}%`,
      };

      setBars(barsWidth!);
    };

    calculateBarWidths();
  }, [counts]);

  return (
    <div className="h-44 p-6 w-full flex items-center">
      <div className="h-28 w-28 flex flex-col justify-center ">
        <p className="font-normal text-4xl text-center">
          {rating}
          <span>
            <TiStarFullOutline size={24} className="inline" />
          </span>
        </p>
        <div>
          <p className="text-sm font-medium text-center text-gray-400">
            {rating} Ratings &{" "}
          </p>
          <p className="text-sm font-medium text-center text-gray-400 ">
            {totalReviews} Reviews{" "}
          </p>
        </div>
      </div>
      <div className="h-full w-[500px] flex flex-col justify-center gap-[2px] pl-5">
        <div className="h-6 w-full flex items-center">
          <p className="w-[10px] text-base mr-1">5</p>
          <TiStarFullOutline size={14} />
          <div className=" h-2 w-[400px] bg-gray-200 ml-4 rounded-lg">
            <p
              style={{ width: bars.fifth }}
              className={`h-2 bg-blue-500 rounded-lg transition-all`}
            ></p>
          </div>
          <span className="ml-3 font-medium text-sm">{counts.five}</span>
        </div>
        <div className="h-6 w-full flex items-center">
          <p className="w-[10px] text-base mr-1">4</p>
          <TiStarFullOutline size={14} />
          <div className="h-2 w-[400px] bg-gray-200 ml-4 rounded-lg">
            <p
              style={{ width: bars.fourth }}
              className={`h-2 bg-blue-500 rounded-lg transition-all`}
            ></p>
          </div>
          <span className="ml-3 font-medium text-sm">{counts.four}</span>
        </div>
        <div className="h-6 w-full flex items-center">
          <p className="w-[10px] text-base mr-1">3</p>
          <TiStarFullOutline size={14} />
          <div className="h-2 w-[400px] bg-gray-200 ml-4 rounded-lg">
            <p
              style={{ width: bars.third }}
              className={`h-2 bg-blue-500 rounded-lg transition-all `}
            ></p>
          </div>
          <span className="ml-3 font-medium text-sm">{counts.three}</span>
        </div>
        <div className="h-6 w-full flex items-center">
          <p className="w-[10px] text-base mr-1">2</p>
          <TiStarFullOutline size={14} />
          <div className="h-2 w-[400px] bg-gray-200 ml-4 rounded-lg">
            <p
              style={{ width: bars.second }}
              className={`h-2 bg-yellow-500 rounded-lg transition-all`}
            ></p>
          </div>
          <span className="ml-3 font-medium text-sm">{counts.two}</span>
        </div>
        <div className="h-6 w-full flex items-center">
          <p className="w-[10px] text-base mr-1">1</p>
          <TiStarFullOutline size={14} />
          <div className="h-2 w-[400px] bg-gray-200 ml-4 rounded-lg">
            <p
              style={{ width: bars.first }}
              className={`h-2 bg-red-600 rounded-lg transition-all`}
            ></p>
          </div>
          <span className="ml-3 font-medium text-sm">{counts.one}</span>
        </div>
      </div>
    </div>
  );
};

export default Rating;
