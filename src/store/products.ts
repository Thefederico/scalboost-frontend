import { create } from "zustand";

import { Params, Products, SortBy } from "@/common/types/products";

interface ProductsState {
  products: Products;
  highlight: boolean;
  minPrice: number;
  maxPrice: number;
  searchName: string;
  sorting: SortBy;

  setProducts: (products: Products) => void;
  toggleHighlight: () => void;
  setMinPrice: (minPrice: number) => void;
  setMaxPrice: (maxPrice: number) => void;
  setSearchName: (searchName: string) => void;
  setSorting: (sorting: SortBy) => void;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  highlight: false,
  minPrice: 0,
  maxPrice: 0,
  searchName: "",
  sorting: SortBy.NONE,

  setProducts: (products) => {
    set({ products });
  },
  toggleHighlight: () => {
    const prev = get().highlight;
    set({ highlight: !prev });
  },

  setMinPrice: (minPrice) => {
    set({ minPrice });
  },
  setMaxPrice: (maxPrice) => {
    set({ maxPrice });
  },
  setSearchName: (searchName) => {
    set({ searchName });
  },
  setSorting: (sorting) => {
    set({ sorting });
  },
}));
