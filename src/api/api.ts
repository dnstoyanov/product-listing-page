import axios from "axios";
import { Product } from "../components/Context";
import { Category } from "../components/Categories";

export const API_URL = "https://api.escuelajs.co/api/v1/categories";
// export const API_URL = "http://demo2132157.mockable.io/api/v1/categories";
export const limitNum = 10;
export const offset = 0;

export const fetchProducts = async (
  categoryId: number | null,
  offset: number = 0,
  limitNum: number = 10
) => {
  if (categoryId !== null) {
    try {
      const response = await axios.get<Product[]>(
        `${API_URL}/${categoryId}/products?offset=${offset}&limit=${limitNum}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductCountByCategory = async (currCategoryId: number) => {
  if (currCategoryId !== null) {
    try {
      const response = await axios.get<Product[]>(
        `${API_URL}/${currCategoryId}/products`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};

export const fetchCategoryById = async (currCategoryId: number) => {
  if (currCategoryId !== null) {
    try {
      const response = await axios.get<Category>(
        `${API_URL}/${currCategoryId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};
