import { Grid, Paper, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { API_URL_2 } from "../api/api";
import { useProductsContext } from "./ProductsContext";
import { useEffect, useState } from "react";

interface Category {
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
  const { setProducts } = useProductsContext();

  useEffect(() => {
    if (selectedCategoryId !== null) {
      fetchProducts(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const fetchProducts = async (categoryId: number) => {
    try {
      const response = await axios.get(`${API_URL_2}/${categoryId}/products`);
      console.log(categoryId);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (limitedCategories.length > 0) {
      const firstCategoryId = limitedCategories[0].id;
      setSelectedCategoryId(firstCategoryId);
    }
  }, [limitedCategories]);

  return (
    <Paper
      sx={{
        padding: "15px",
        borderRadius: 0,
        boxShadow: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          width: "400px",
        },
        [theme.breakpoints.up("md")]: {
          width: "600px",
        },
        [theme.breakpoints.up("lg")]: {
          width: "800px",
        },
      }}
    >
      <Grid container>
        {limitedCategories.map((category: Category) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            key={category.id}
            onClick={() => fetchProducts(category.id)}
          >
            <Stack
              sx={{
                textAlign: "center",
                color: "black",
                cursor: "pointer",
                padding: "10px",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              {category.name}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Categories;
