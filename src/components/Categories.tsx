import { Grid, Paper, Stack } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../api/api";
import { useProductsContext } from "./ProductsContext";

interface CategoriesProps {
  categories: string[];
}

const Categories = ({ categories }: CategoriesProps) => {
  const theme = useTheme();

  const { setProducts } = useProductsContext();

  const fetchProducts = async (category: string) => {
    try {
      const response = await axios.get(
        `${API_URL}/products/category/${category}`
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
        {categories.map((category: string) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            key={uuidv4()}
            onClick={() => fetchProducts(category)}
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
              {category}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Categories;
