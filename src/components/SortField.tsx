import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material/";
import { Product, useAppContext } from "./Context";

const SortingOptions = {
  ALPHABETICAL_A_TO_Z: "ALPHABETICAL_A_TO_Z",
  ALPHABETICAL_Z_TO_A: "ALPHABETICAL_Z_TO_A",
  PRICE_ASCENDING: "PRICE_ASCENDING",
  PRICE_DESCENDING: "PRICE_DESCENDING",
};

const SortField = () => {
  const { products, setProducts } = useAppContext();
  const [sortingOption, setSortingOption] = useState<string>(
    SortingOptions.ALPHABETICAL_A_TO_Z
  );
  const isMountedRef = useRef(true);

  const sortingFunctions = {
    [SortingOptions.ALPHABETICAL_A_TO_Z]: (a: Product, b: Product) =>
      a.title.localeCompare(b.title),
    [SortingOptions.ALPHABETICAL_Z_TO_A]: (a: Product, b: Product) =>
      b.title.localeCompare(a.title),
    [SortingOptions.PRICE_ASCENDING]: (a: Product, b: Product) =>
      a.price - b.price,
    [SortingOptions.PRICE_DESCENDING]: (a: Product, b: Product) =>
      b.price - a.price,
  };

  const sortProducts = (selectedOption: string) => {
    const sortedProducts = [...products];
    const sortingFunction = sortingFunctions[selectedOption];
    if (sortingFunction) {
      sortedProducts.sort(sortingFunction);
      setProducts(sortedProducts);
    }
  };

  useEffect(() => {
    const sortedProducts = [...products];
    const sortingFunction = sortingFunctions[sortingOption];
    if (sortingFunction) {
      sortedProducts.sort(sortingFunction);
      setProducts(sortedProducts);
    }
  }, [products, setProducts]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedOption = event.target.value;
    setSortingOption(selectedOption);
    sortProducts(selectedOption);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select id="simple-sort" onChange={handleChange} value={sortingOption}>
          <MenuItem value={SortingOptions.ALPHABETICAL_A_TO_Z}>
            Alphabetical A-Z
          </MenuItem>
          <MenuItem value={SortingOptions.ALPHABETICAL_Z_TO_A}>
            Alphabetical Z-A
          </MenuItem>
          <MenuItem value={SortingOptions.PRICE_ASCENDING}>
            Price ascending
          </MenuItem>
          <MenuItem value={SortingOptions.PRICE_DESCENDING}>
            Price descending
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortField;
