import { Reviews } from "@/lib/definations";
import React, { useEffect, useState } from "react";

import { TiStarFullOutline } from "react-icons/ti";

const Rating = ({
  rating,
  noOfReviews,
  reviews,
}: {
  rating: number;
  noOfReviews: number;
  reviews: Reviews[];
}) => {
  const [five, setFive] = useState(0);
  const [four, setFour] = useState(0);
  const [three, setThree] = useState(0);
  const [two, setTwo] = useState(0);
  const [one, setOne] = useState(0);

  const [fifthBar, setFifthBar] = useState("");
  const [fourthBar, setFourthBar] = useState("");
  const [thirdBar, setThirdBar] = useState("");
  const [secondBar, setSecondBar] = useState("");
  const [firstBar, setFirstBar] = useState("");

  useEffect(() => {
    let fiveCount = 0;
    let fourCount = 0;
    let threeCount = 0;
    let twoCount = 0;
    let oneCount = 0;

    reviews.map((value) => {
      if (value.rating === 5) fiveCount++;
      else if (value.rating === 4) fourCount++;
      else if (value.rating === 3) threeCount++;
      else if (value.rating === 2) twoCount++;
      else if (value.rating === 1) oneCount++;
    });

    // calcubar(fiveCount, fourCount, threeCount, twoCount, oneCount);

    const res1 = calcuRatingBar(
      fiveCount,
      setFifthBar,
      {
        value: fourCount,
        setState: setFourthBar,
      },
      {
        value: threeCount,
        setState: setThirdBar,
      },
      {
        value: twoCount,
        setState: setSecondBar,
      },
      {
        value: oneCount,
        setState: setFirstBar,
      }
    );

    const res2 = calcuRatingBar(
      fourCount,
      setFourthBar,
      {
        value: fiveCount,
        setState: setFifthBar,
      },
      {
        value: threeCount,
        setState: setThirdBar,
      },
      {
        value: twoCount,
        setState: setSecondBar,
      },
      {
        value: oneCount,
        setState: setFirstBar,
      }
    );

    setFive(fiveCount);
    setFour(fourCount);
    setThree(threeCount);
    setTwo(twoCount);
    setOne(oneCount);
  }, [reviews]);

  const calcuRatingBar = (
    highValue: number,
    setState: React.Dispatch<React.SetStateAction<string>>,
    ...lowValue: {
      setState: React.Dispatch<React.SetStateAction<string>>;
      value: number;
    }[]
  ) => {
    let count = 0;
    let results = [];

    for (let i = 0; i < lowValue.length; i++) {
      if (highValue > lowValue[i].value) {
        const res = `w-[${
          Number((lowValue[i].value / highValue).toFixed(1)) * 100
        }%]`;

        results.push(res);

        count++;
      } else {
        break;
      }
    }

    if (count === 4) {
      for (let i = 0; i < results.length; i++) {
        console.log(results[i]);

        lowValue[i].setState(results[i]);
      }
      setState(`w-[100%]`);
    }
  };

  // const calcubar = (
  //   fiveCount: number,
  //   fourCount: number,
  //   threeCount: number,
  //   twoCount: number,
  //   oneCount: number
  // ) => {
  //   if (
  //     fiveCount > fourCount &&
  //     fiveCount > threeCount &&
  //     fiveCount > twoCount &&
  //     fiveCount > oneCount
  //   ) {
  //     setFifthBar(` w-[100%] `);
  //     setFourthBar(
  //       ` w-[${Number((fourCount / fiveCount).toFixed(1)) * 100}%] `
  //     );
  //     setThirdBar(`w-[${Number((threeCount / fiveCount).toFixed(1)) * 100}%]`);
  //     setSecondBar(`w-[${Number((twoCount / fiveCount).toFixed(1)) * 100}%]`);
  //     setFirstBar(`w-[${Number((oneCount / fiveCount).toFixed(1)) * 100}%]`);
  //   } else if (
  //     fourCount > fiveCount &&
  //     fourCount > threeCount &&
  //     fourCount > twoCount &&
  //     fourCount > oneCount
  //   ) {
  //     setFifthBar(` w-[${Number((fiveCount / fourCount).toFixed(1)) * 100}%] `);
  //     setFourthBar(` w-[100%] `);
  //     setThirdBar(`w-[${Number((threeCount / fourCount).toFixed(1)) * 100}%]`);
  //     setSecondBar(`w-[${Number((twoCount / fourCount).toFixed(1)) * 100}%]`);
  //     setFirstBar(`w-[${Number((oneCount / fourCount).toFixed(1)) * 100}%]`);
  //   } else if (
  //     threeCount > fiveCount &&
  //     threeCount > fourCount &&
  //     threeCount > twoCount &&
  //     threeCount > oneCount
  //   ) {
  //     setFifthBar(`w-[${Number((fiveCount / threeCount).toFixed(1)) * 100}%]`);
  //     setFourthBar(`w-[${Number((fourCount / threeCount).toFixed(1)) * 100}%]`);
  //     setThirdBar(`w-[100%]`);
  //     setSecondBar(`w-[${Number((twoCount / threeCount).toFixed(1)) * 100}%]`);
  //     setFirstBar(`w-[${Number((oneCount / threeCount).toFixed(1)) * 100}%]`);
  //   } else if (
  //     twoCount > fiveCount &&
  //     twoCount > fourCount &&
  //     twoCount > threeCount &&
  //     twoCount > oneCount
  //   ) {
  //     setFifthBar(`w-[${Number((fiveCount / twoCount).toFixed(1)) * 100}%]`);
  //     setFourthBar(`w-[${Number((fourCount / twoCount).toFixed(1)) * 100}%]`);
  //     setThirdBar(`w-[${Number((threeCount / twoCount).toFixed(1)) * 100}%]`);
  //     setSecondBar(`w-[100%]`);
  //     setFirstBar(`w-[${Number((oneCount / twoCount).toFixed(1)) * 100}%]`);
  //   } else if (
  //     oneCount > fiveCount &&
  //     oneCount > fourCount &&
  //     oneCount > threeCount &&
  //     oneCount > twoCount
  //   ) {
  //     setFifthBar(`w-[${Number((fiveCount / oneCount).toFixed(1)) * 100}%]`);
  //     setFourthBar(`w-[${Number((fourCount / oneCount).toFixed(1)) * 100}%]`);
  //     setThirdBar(`w-[${Number((threeCount / oneCount).toFixed(1)) * 100}%]`);
  //     setSecondBar(`w-[${Number((twoCount / oneCount).toFixed(1)) * 100}%]`);
  //     setFirstBar(`w-[100%]`);
  //   }
  // };

  return (
    <div className="h-44 p-6 w-full flex items-center">
      <div className="h-28 w-28 flex flex-col justify-center ">
        <p className="font-normal text-4xl text-center">
          {rating}
          <span>
            <TiStarFullOutline size={24} className="inline " />
          </span>
        </p>
        <div>
          <p className="text-sm font-medium text-center text-gray-400">
            {rating} Ratings &{" "}
          </p>
          <p className="text-sm font-medium text-center text-gray-400 ">
            {noOfReviews} Reviews{" "}
          </p>
        </div>
      </div>
      <div className="h-full w-[500px] flex flex-col justify-center gap-[2px] pl-5">
        <div className="h-6 w-full flex items-center">
          <p className="w-[10px] text-base mr-1">5</p>
          <TiStarFullOutline size={14} />
          <div className=" h-2 w-[400px] bg-gray-200 ml-4 rounded-lg">
            <p className={`h-2 ${fifthBar} bg-blue-500 rounded-lg`}></p>
          </div>
          <span className="ml-3 font-medium text-sm">{five}</span>
        </div>
        <div className="h-6 w-full flex items-center">
          <p className="w-[10px] text-base mr-1">4</p>
          <TiStarFullOutline size={14} />
          <div className="h-2 w-[400px] bg-gray-200 ml-4 rounded-lg">
            <p className={`h-2 ${fourthBar} bg-blue-500 rounded-lg`}></p>
          </div>
          <span className="ml-3 font-medium text-sm">{four}</span>
        </div>
        <div className="h-6 w-full flex items-center">
          <p className="w-[10px] text-base mr-1">3</p>
          <TiStarFullOutline size={14} />
          <div className="h-2 w-[400px] bg-gray-200 ml-4 rounded-lg">
            <p className={`h-2 ${thirdBar} bg-blue-500 rounded-lg `}></p>
          </div>
          <span className="ml-3 font-medium text-sm">{three}</span>
        </div>
        <div className="h-6 w-full flex items-center">
          <p className="w-[10px] text-base mr-1">2</p>
          <TiStarFullOutline size={14} />
          <div className="h-2 w-[400px] bg-gray-200 ml-4 rounded-lg">
            <p className={`h-2 ${secondBar} bg-yellow-500 rounded-lg `}></p>
          </div>
          <span className="ml-3 font-medium text-sm">{two}</span>
        </div>
        <div className="h-6 w-full flex items-center">
          <p className="w-[10px] text-base mr-1">1</p>
          <TiStarFullOutline size={14} />
          <div className="h-2 w-[400px] bg-gray-200 ml-4 rounded-lg">
            <p className={`h-2 ${firstBar} bg-red-600 rounded-lg `}></p>
          </div>
          <span className="ml-3 font-medium text-sm">{one}</span>
        </div>
      </div>
    </div>
  );
};

export default Rating;
