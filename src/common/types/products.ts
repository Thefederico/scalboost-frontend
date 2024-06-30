export type Products = Product[];

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  imageUrl: string;
  category: string;
}

export interface ProductPayload {
  category: string;
  name: string;
  stock: string;
  description: string;
  price: string;
  imageUrl: string;
}

export enum Categories {
  "T-Shirt",
  "Hoodie",
  "Joggers",
  "Cap",
}

export enum SortBy {
  NONE = "none",
  NAME = "name",
  PRICE_ASCENDING = "priceAscending",
  STOCK = "stock",
  CATEGORY = "category",
  DESCRIPTION = "description",
}

export interface Params {
  limit?: number | null;
  offset?: number | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  category?: string | null;
  name?: string | null;
}
