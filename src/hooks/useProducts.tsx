"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { useProductsStore } from "@/store/products";
import { Products } from "@/common/types/products";

const useProducts = () => {
  const { products, setProducts } = useProductsStore((state) => state);

  console.log("products", products);

  const getProducts = async ({
    params,
    cb,
  }: {
    params?: {
      limit?: number;
      offset?: number;
      minPrice?: number;
      maxPrice?: number;
      category?: string;
      search?: string;
    };
    cb?: () => void;
  }) => {
    try {
      const { data } = await axios.get<Products>(
        "http://localhost:8000/products",
        { params }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getProducts,
    products,
  };
};

export { useProducts };
