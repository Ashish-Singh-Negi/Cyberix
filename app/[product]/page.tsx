"use client";

import React, { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import { LaptopProps, MobileProps } from "@/lib/definations";
import axios from "axios";
import Loader from "../components/Loader";

const ProductsPage = ({ params }: { params: { product: string } }) => {
  const [products, setProducts] = useState<Array<
    MobileProps | LaptopProps
  > | null>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(
            `/api/product/${params.product.toLowerCase()}/getAll`
          );
          setProducts(data.data);
        } catch (error: any) {
          console.error(error.message);
        } finally {
          setLoading(false);
        }
      })();
    }, 2000);
  }, [params.product]);

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
