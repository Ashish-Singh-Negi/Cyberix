"use client";

import React, { useEffect, useState } from "react";

// fix <br /> BUG

const Review = ({ review }: { review: string }) => {
  const [sentence, setSentence] = useState<String[]>([]);

  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (review.length > 520 && review.length > 800) {
      setSentence(shortReviewHandler(review));
      return;
    }

    setSentence(splitReviewHandler(review));
  }, []);

  useEffect(() => {
    if (showMore) {
      setSentence(splitReviewHandler(review));
    }
    if (!showMore && sentence.length) {
      setSentence(shortReviewHandler(review));
    }
  }, [showMore]);

  const shortReviewHandler = (review: string) => {
    const reviewSlice = review.slice(0, 520);
    const reviewIs = splitReviewHandler(reviewSlice);

    for (let i = 0; i < reviewIs.length; i++) {
      if (i === reviewIs.length - 1) {
        reviewIs[i] = `${reviewIs[i]}...`;
      }
    }

    return reviewIs;
  };

  const splitReviewHandler = (review: string) => {
    const reviewIs = review.split("\n");

    for (let i = 0; i < reviewIs.length; i++) {
      if (reviewIs[i] === "") {
        reviewIs.splice(i, 1);
      }
    }

    return reviewIs;
  };

  return (
    <div
      key={`review-${review.length}`}
      className={`h-fit w-full overflow-y-auto text-sm text-gray-600 dark:text-gray-400 font-normal mb-4`}
    >
      {sentence.map((value, index) => (
        <div key={`${value}`}>
          <br />
          <p className="inline">{value}</p>
          {index === sentence.length - 1 &&
            review.length > 520 &&
            review.length > 800 &&
            !showMore && (
              <button
                onClick={() => setShowMore(!showMore)}
                className="font-medium text-blue-600 dark:text-blue-400"
              >
                <span>show more</span>
              </button>
            )}
        </div>
      ))}
      {showMore && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="font-medium text-blue-600 dark:text-blue-400"
        >
          show less
        </button>
      )}
    </div>
  );
};

export default Review;
