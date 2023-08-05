import axios from "axios";
import { Product } from "../components/Context";

export const API_URL = "https://fakestoreapi.com";
export const API_URL_2 = "https://api.escuelajs.co/api/v1/categories";
export const limitNum = 10;
export const offset = 0;

export const fetchProducts = async (
  categoryId: number | null,
  offset: number = 0,
  limitNum: number = 10
) => {
  if (categoryId !== null) {
    try {
      const response = await axios.get(
        `${API_URL_2}/${categoryId}/products?offset=${offset}&limit=${limitNum}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL_2}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductCountByCategory = async (currCategoryId: number) => {
  if (currCategoryId !== null) {
    try {
      const response = await axios.get<Product[]>(
        `${API_URL_2}/${currCategoryId}/products`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};
