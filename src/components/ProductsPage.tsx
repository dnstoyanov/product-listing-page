import React, { useEffect, useState } from "react";
import Products from "./Products";
import SortField from "./SortField";
import CategoryDescription from "./CategoryDescription";
import FilterProducts from "./FilterProducts";
import {
  Button,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { API_URL_2, limitNum } from "../api/api";
import axios from "axios";
import { Product, useAppContext } from "./Context";

const SortingOptions = {
  ALPHABETICAL_A_TO_Z: "ALPHABETICAL_A_TO_Z",
  ALPHABETICAL_Z_TO_A: "ALPHABETICAL_Z_TO_A",
  PRICE_ASCENDING: "PRICE_ASCENDING",
  PRICE_DESCENDING: "PRICE_DESCENDING",
};

const ProductsPage = () => {
  const { products, currCategoryId } = useAppContext();
  const [offset, setOffset] = useState(10);
  const [allProdCount, setAllProdCount] = useState<number | null>(null);
  const [sortingOption, setSortingOption] = useState<string>(
    SortingOptions.ALPHABETICAL_A_TO_Z
  );
  const [listOfProducts, setlistOfProducts] = useState<Product[]>(products);
  const [minPriceFilter, setMinPriceFilter] = useState<number>(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(3000);
  const [titleFilter, setTitleFilter] = useState<string>("");
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
  const filteredProducts = sortProducts(
    listOfProducts.filter(
      (product) =>
        product.price >= minPriceFilter &&
        product.price <= maxPriceFilter &&
        (titleFilter === "" ||
          product.title.toLowerCase().includes(titleFilter.toLowerCase()))
    ),
    sortingOption
  );

  const handleLoadMore = async () => {
    setOffset(offset + 10);
    try {
      const response = await axios.get<Product[]>(
        `${API_URL_2}/${currCategoryId}/products?offset=${offset}&limit=${limitNum}`
      );

      const newProducts = response.data.filter((value, index, self) => {
        return self.findIndex((product) => product.id === value.id) === index;
      });
      setlistOfProducts((prevProducts) => [...prevProducts, ...newProducts]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductCountByCategory(currCategoryId!);
  }, [currCategoryId]);

  const fetchProductCountByCategory = async (currCategoryId: number) => {
    try {
      const response = await axios.get<Product[]>(
        `${API_URL_2}/${currCategoryId}/products`
      );
      const totalProductCount = response.data.length;
      setAllProdCount(totalProductCount);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePriceFilter = (
    titleFilter: string,
    minPrice: number,
    maxPrice: number
  ) => {
    setTitleFilter(titleFilter);
    setMinPriceFilter(minPrice);
    setMaxPriceFilter(maxPrice);
  };

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
        <FilterProducts onFilter={handlePriceFilter} />
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
            <Products filteredProducts={filteredProducts} />
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
            {filteredProducts.length !== allProdCount && (
              <Button
                sx={{
                  backgroundColor: "#92c736",
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
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductsPage;
