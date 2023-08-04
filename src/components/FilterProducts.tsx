import React, { useState } from "react";
import {
  TextField,
  Button,
  Slider,
  Grid,
  Box,
  Typography,
} from "@mui/material";

interface FilterProps {
  onFilter: (titleFilter: string, minPrice: number, maxPrice: number) => void;
}

const FilterProducts: React.FC<FilterProps> = ({ onFilter }) => {
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(3000);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleFilter(event.target.value);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(event.target.value));
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(event.target.value));
  };

  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (Array.isArray(newValue)) {
      setMinPrice(newValue[0]);
      setMaxPrice(newValue[1]);
    }
  };

  const handleApplyFilterClick = () => {
    onFilter(titleFilter, minPrice, maxPrice);
  };

  const handleClearFilterClick = () => {
    console.log("cleared");
  };

  return (
    <Grid
      container
      spacing={2}
      paddingLeft={3}
      paddingRight={3}
      paddingTop={4.3}
    >
      <Grid item xs={12} marginBottom={5}>
        <Typography>Filter by title:</Typography>
        <TextField
          fullWidth
          value={titleFilter}
          onChange={handleTitleChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography>Filter by price:</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="number"
          label="Min Price"
          value={minPrice}
          onChange={handleMinPriceChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="number"
          label="Max Price"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <Box width="100%" px={2}>
          <Slider
            value={[Number(minPrice), Number(maxPrice)]}
            onChange={handleSliderChange}
            min={0}
            max={3000}
            step={10}
            valueLabelDisplay="auto"
          />
        </Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleApplyFilterClick}
          fullWidth
          sx={{
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          }}
        >
          Apply Filter
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#757575",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#55911b",
              boxShadow: "none",
            },
          }}
          onClick={handleClearFilterClick}
          fullWidth
        >
          Clear Filter
        </Button>
      </Grid>
    </Grid>
  );
};

export default FilterProducts;
