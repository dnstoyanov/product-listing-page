import React, { useEffect, useState } from "react";
import Products from "./Products";
import SortField from "./SortField";
import CategoryDescription from "./CategoryDescription";
import FilterProducts from "./FilterProducts";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { API_URL, fetchProductCountByCategory, limitNum } from "../api/api";
import axios from "axios";
import { Product, useAppContext } from "./Context";

enum SortingOptions {
  ALPHABETICAL_A_TO_Z = "ALPHABETICAL_A_TO_Z",
  ALPHABETICAL_Z_TO_A = "ALPHABETICAL_Z_TO_A",
  PRICE_ASCENDING = "PRICE_ASCENDING",
  PRICE_DESCENDING = "PRICE_DESCENDING",
}

const ProductsPage = () => {
  const { products, currCategoryId, offset, setOffset } = useAppContext();
  const [allProdCount, setAllProdCount] = useState<number | null>(null);
  const [sortingOption, setSortingOption] = useState<string>(
    SortingOptions.ALPHABETICAL_A_TO_Z
  );
  const [listOfProducts, setlistOfProducts] = useState<Product[]>(products);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [filterOptions, setFilterOptions] = useState({
    titleFilter: "",
    minPrice: 0,
    maxPrice: 10000,
  });

  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setlistOfProducts(products);
  }, [products]);

  const handleSortChange = (selectedOption: string) => {
    setSortingOption(selectedOption);
  };

  const sortProducts = (products: Product[], sortingOption: string) => {
    switch (sortingOption) {
      case SortingOptions.ALPHABETICAL_A_TO_Z:
        return products.sort((a, b) => a.title.localeCompare(b.title));
      case SortingOptions.ALPHABETICAL_Z_TO_A:
        return products.sort((a, b) => b.title.localeCompare(a.title));
      case SortingOptions.PRICE_ASCENDING:
        return products.sort((a, b) => a.price - b.price);
      case SortingOptions.PRICE_DESCENDING:
        return products.sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  const filterProducts = (
    products: Product[],
    minPrice: number,
    maxPrice: number,
    titleFilter: string
  ) => {
    return products.filter(
      (product) =>
        product.price >= minPrice &&
        product.price <= maxPrice &&
        (titleFilter === "" ||
          product.title.toLowerCase().includes(titleFilter.toLowerCase()))
    );
  };

  const filteredProducts = filterProducts(
    listOfProducts,
    filterOptions.minPrice,
    filterOptions.maxPrice,
    filterOptions.titleFilter
  );

  const handlePriceFilter = (
    titleFilter: string,
    minPrice: number,
    maxPrice: number
  ) => {
    setFilterOptions({
      titleFilter,
      minPrice,
      maxPrice,
    });
  };

  const sortedProducts = sortProducts(filteredProducts, sortingOption);

  const handleLoadMore = async () => {
    if (currCategoryId !== null) {
      try {
        setOffset(offset + 10);
        setIsLoading(true);
        console.log("fff");
        const response = await axios.get<Product[]>(
          `${API_URL}/${currCategoryId}/products?offset=${offset}&limit=${limitNum}`
        );

        const newProducts = response.data.filter((value, index, self) => {
          return self.findIndex((product) => product.id === value.id) === index;
        });
        setlistOfProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProductCountByCategory(currCategoryId!)
      .then((data) => {
        const totalProductCount = data!.length;
        setAllProdCount(totalProductCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currCategoryId]);

  return (
    <Grid
      container
      sx={{
        marginTop: 4,
        padding: 3,
        height: "100%",
        display: "flex",
        flexWrap: "wrap",
        overflowY: "auto",
      }}
    >
      <Grid item xs={12} md={3}>
        <FilterProducts
          onFilter={handlePriceFilter}
          filterOptions={filterOptions}
        />
      </Grid>

      <Grid item xs={12} md={9}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          marginBottom={5}
          sx={{ marginTop: isSmallScreen ? 4 : undefined }}
        >
          <Grid item xs={12} sm={4}>
            <Grid item xs={12}>
              <CategoryDescription />
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1} direction="row">
                <Typography variant="body1" color="primary">
                  {filteredProducts.length} Products
                </Typography>
                {allProdCount !== null && (
                  <Typography variant="body1" color="secondary">
                    ({allProdCount} Total)
                  </Typography>
                )}
              </Stack>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={4}>
            <SortField
              sortingOption={sortingOption}
              onSortChange={handleSortChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Products filteredProducts={sortedProducts} />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {listOfProducts.length !== allProdCount && (
              <Box sx={{ m: 1, position: "relative" }}>
                <Button
                  disabled={isLoading}
                  sx={{
                    backgroundColor: isLoading ? "gray" : "#92c736",
                    marginTop: 5,
                    marginBottom: 5,
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
                {isLoading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: "#1976d2",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Box>
            )}
            <Box sx={{ m: 1, position: "relative" }}></Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductsPage;
