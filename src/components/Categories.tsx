import { Grid, Paper, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { API_URL_2, offset, limitNum } from "../api/api";
import { useAppContext } from "./Context";
import { useEffect, useState } from "react";

export interface Category {
  createdAt: string;
  id: number;
  image: string;
  name: string;
  updatedAt: string;
}

interface CategoriesProps {
  categories: Category[];
  limit: number;
}

const Categories = ({ categories, limit }: CategoriesProps) => {
  const theme = useTheme();
  const limitedCategories = categories.slice(0, limit);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const { setProducts } = useAppContext();
  const { setSelectedCategory, setCurrCategoryId } = useAppContext();

  const fetchProducts = async (categoryId: number) => {
    try {
      const response = await axios.get(
        `${API_URL_2}/${categoryId}/products?offset=${offset}&limit=${limitNum}`
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedCategoryId === null && limitedCategories.length > 0) {
      const firstCategoryId = limitedCategories[0].id;
      setSelectedCategoryId(firstCategoryId);
      setCurrCategoryId(firstCategoryId);
      setSelectedCategory(limitedCategories[0]);
    }
  }, [selectedCategoryId, limitedCategories, setSelectedCategory]);

  useEffect(() => {
    if (selectedCategoryId !== null) {
      setCurrCategoryId(selectedCategoryId);
      fetchProducts(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  return (
    <Grid container>
      {limitedCategories.map((category: Category) => (
        <Grid
          item
          xs={12}
          sm={3}
          md={2}
          key={category.id}
          onClick={() => {
            setCurrCategoryId(category.id);
            setSelectedCategory(category);
            fetchProducts(category.id);
          }}
        >
          <Stack
            sx={{
              textAlign: "center",
              color: "black",
              cursor: "pointer",
              padding: "10px",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#1976d2",
                color: "white",
              },
            }}
          >
            {category.name}
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

export default Categories;
