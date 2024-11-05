import Image from "next/image";

import React, { Dispatch, SetStateAction } from "react";

type ProductImagesProps = {
  colorsImgs: Color[];
  color: string;
  img: string;
  defaultImgs: string[];
  setImg: Dispatch<SetStateAction<string | null>>;
};

const ProductImages = ({
  colorsImgs,
  color,
  img,
  defaultImgs,
  setImg,
}: ProductImagesProps) => {
  return (
    <>
      {colorsImgs.map(
        (value) =>
          value.color === color &&
          value.imgURLs.map((url, index) => (
            <div
              key={index}
              onMouseOver={() => setImg(url)}
              className={`h-20 w-20 border-2 hover:border-blue-600 transition-all cursor-pointer ${
                img === url && "border-blue-600"
              }`}
            >
              <Image src={url} alt="Product Image" height={80} width={80} />
            </div>
          ))
      )}
      {defaultImgs.map((url) => (
        <div
          key={url}
          onMouseOver={() => setImg(url)}
          className={`h-20 w-20 border-2 hover:border-blue-600 transition-all cursor-pointer ${
            img === url && "border-blue-600"
          }`}
        >
          <Image src={url} alt="Product Image" height={80} width={80} />
        </div>
      ))}
    </>
  );
};

export default ProductImages;
