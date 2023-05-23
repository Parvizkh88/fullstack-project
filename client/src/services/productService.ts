
import { Product } from "@types";
import axiosInstance from "./axios";



const createProduct = async (product: Product) => {
  try {
    let response = await axiosInstance.post(
      "/admin/products",
      product
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

const getProducts = async () => {
  try {
    let response = await axiosInstance.get("/admin/products",{withCredentials:true});
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};


export { createProduct, getProducts };
