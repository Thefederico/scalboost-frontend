import {
  Params,
  Product,
  ProductPayload,
  Products,
} from "@/common/types/products";
import axios from "axios";

export const getProducts = async ({ params }: { params?: Params }) => {
  try {
    const { data } = await axios.get<Products>(
      "http://localhost:8000/products",
      { params }
    );

    return data;
  } catch (error) {
    console.log("Error fetching products: ", error);
  }
};

export const deleteProduct = async ({ id }: { id: string }) => {
  try {
    const response = await axios.delete(`http://localhost:8000/products/${id}`);
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
    const response = await axios.post<Product>(
      "http://localhost:8000/products",
      product
    );
    return response;
  } catch (error) {
    throw new Error("Failed to create product");
  }
};
