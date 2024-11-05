"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";

import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { useParams } from "next/navigation";

const ProductsPage = () => {
  const { product } = useParams();

  // const [categoryParams, setCategoryParams] = useState<string | null>(null);

  const [products, setProducts] = useState<Array<
    MobileProps | LaptopProps
  > | null>([]);

  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const result = await product;
  //     console.log(result);
  //     setCategoryParams(result.product.toLowerCase());
  //   })();
  // }, [params]);

  useEffect(() => {
    // const id = setTimeout(() => {
    const getProducts = async (url: string, retries: number) => {
      try {
        setLoading(true);

        const { data } = await axios.get(url);

        console.log(data);

        setProducts(data.data);

        setLoading(false);
      } catch (error) {
        if (retries > 0) {
          console.warn(`Retrying... (${retries} attempts left)`);
          return getProducts(`/api/product/${product}/getAll`, retries - 1);
        }
        console.error(error);
      }
    };
    // console.log(`/api/product/${product}/getAll`);
    getProducts(`/api/product/${product}/getAll`, 3);
    // }, 1000);

    // return () => {
    //   clearTimeout(id);
    // };
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="h-full w-full py-2 flex flex-col items-center 2xl:grid grid-cols-2 justify-items-center gap-y-4 overflow-y-auto dark:bg-gray-900">
          {products &&
            products.map((item) => (
              <ProductCard
                key={item.productName}
                pid={item._id}
                brandName={item.brandName}
                category={item.category}
                productName={item.productName}
                color={item.color[0].color}
                varient={item.varients[0]}
                highlights={item.highlights}
                img={item.color[0].imgURLs[0]}
                rating={item.rating}
                reviews={item.reviews}
              />
            ))}
        </main>
      )}
    </>
  );
};

export default ProductsPage;
