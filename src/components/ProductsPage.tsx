import React from "react";
import Products from "./Products";
import SortField from "./SortField";
import CategoryDescription from "./CategoryDescription";
import FilterProducts from "./FilterProducts";
import { Grid } from "@mui/material";

const ProductsPage = () => {
  return (
    <Grid container sx={{ marginTop: 2 }}>
      <FilterProducts />
      <CategoryDescription />
      <SortField />
      <Products />
    </Grid>
  );
};

export default ProductsPage;
