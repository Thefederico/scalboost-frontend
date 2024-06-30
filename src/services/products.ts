import {
  Params,
  Product,
  ProductPayload,
  Products,
} from "@/common/types/products";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL_BASE;

export const getProducts = async ({ params }: { params?: Params }) => {
  try {
    const { data } = await axios.get<Products>(`${baseURL}/products`, {
      params,
    });

    return data;
  } catch (error) {
    console.log("Error fetching products: ", error);
  }
};

export const deleteProduct = async ({ id }: { id: string }) => {
  try {
    const response = await axios.delete(`${baseURL}/products/${id}`);
    return response;
  } catch (error) {
    console.log("Error deleting product: ", error);
  }
};

export const createProduct = async ({
  product,
}: {
  product: ProductPayload;
}) => {
  try {
    const response = await axios.post<Product>(`${baseURL}/products`, product);
    return response;
  } catch (error) {
    throw new Error("Failed to create product");
  }
};

export const getCsvProducts = async () => {
  try {
    const { data } = await axios.get(`${baseURL}/products/csv`, {
      responseType: "blob",
    });
    return data;
  } catch (error) {
    console.log("Error fetching csv products: ", error);
  }
};
