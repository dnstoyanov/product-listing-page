import React, { useEffect, useState } from "react";
import Products from "./Products";
import SortField from "./SortField";
import CategoryDescription from "./CategoryDescription";
import FilterProducts from "./FilterProducts";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { API_URL_2, limitNum } from "../api/api";
import axios from "axios";
import { Product, useAppContext } from "./Context";

const ProductsPage = () => {
  const { products, setProducts, currCategoryId } = useAppContext();
  const [offset, setOffset] = useState(10);
  const [allProdCount, setAllProdCount] = useState<number | null>(null);

  useEffect(() => {
    fetchProductCountByCategory(currCategoryId!);
  }, [currCategoryId]);

  const fetchProductCountByCategory = async (currCategoryId: number) => {
    try {
      const response = await axios.get<Product[]>(
        `${API_URL_2}/${currCategoryId}/products`
      );
      const totalProductCount = response.data.length;
      console.log("totalProductCount", totalProductCount);
      setAllProdCount(totalProductCount);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadMore = async () => {
    setOffset(offset + 10);
    try {
      const response = await axios.get<Product[]>(
        `${API_URL_2}/${currCategoryId}/products?offset=${offset}&limit=${limitNum}`
      );

      const newProducts = response.data.filter((value, index, self) => {
        return self.findIndex((product) => product.id === value.id) === index;
      });
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container sx={{ marginTop: 4 }}>
      <Grid item xs={12} md={3}>
        <FilterProducts />
      </Grid>

      <Grid item xs={12} md={9}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CategoryDescription />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1} direction="row">
              <Typography variant="body1" color="primary">
                {products.length} Products
              </Typography>
              {allProdCount !== null && (
                <Typography variant="body1" color="secondary">
                  ({allProdCount} Total)
                </Typography>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <SortField />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Products />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            padding: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              backgroundColor: "#92c736",
              color: "white",
              "&:hover": {
                backgroundColor: "#55911b",
                cursor: "pointer",
              },
            }}
            onClick={() => handleLoadMore()}
          >
            Load More
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductsPage;
