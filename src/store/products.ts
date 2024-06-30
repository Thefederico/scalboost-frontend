import { create } from "zustand";

import { Products, SortBy } from "@/common/types/products";

interface ProductsState {
  products: Products;
  highlight: boolean;
  limit: number;
  offset: number;
  minPrice: number | null;
  maxPrice: number | null;
  searchName: string;
  sorting: SortBy;
  hasMoreProducts: boolean;
  category: string | null;

  setProducts: (products: Products) => void;
  toggleHighlight: () => void;
  setMinPrice: (minPrice: number) => void;
  setMaxPrice: (maxPrice: number) => void;
  setSearchName: (searchName: string) => void;
  setSorting: (sorting: SortBy) => void;
  setLimit: (limit: number) => void;
  setOffset: (offset: number) => void;
  setHasMoreProducts: (hasMoreProducts: boolean) => void;
  setCategory: (category: string | null) => void;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  highlight: false,
  limit: 10,
  offset: 0,
  minPrice: null,
  maxPrice: null,
  searchName: "",
  sorting: SortBy.NONE,
  hasMoreProducts: true,
  category: null,

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
  setLimit: (limit) => {
    set({ limit });
  },
  setOffset: (offset) => {
    set({ offset });
  },
  setHasMoreProducts: (hasMoreProducts) => {
    set({ hasMoreProducts });
  },
  setCategory: (category) => {
    set({ category });
  },
}));
