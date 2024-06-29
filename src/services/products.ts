import { Params, Products } from "@/common/types/products";
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
