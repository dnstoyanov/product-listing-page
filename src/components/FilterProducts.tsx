import {
  TextField,
  // Button,
  Slider,
  Grid,
  Box,
  Typography,
} from "@mui/material";

interface FilterProps {
  onFilter: (titleFilter: string, minPrice: number, maxPrice: number) => void;
  filterOptions: {
    titleFilter: string;
    minPrice: number;
    maxPrice: number;
  };
}

const FilterProducts: React.FC<FilterProps> = ({ onFilter, filterOptions }) => {
  const { titleFilter, minPrice, maxPrice } = filterOptions;

  // const [titleFilter, setTitleFilter] = useState(initialTitleFilter);
  // const [minPrice, setMinPrice] = useState(initialMinPrice);
  // const [maxPrice, setMaxPrice] = useState(initialMaxPrice);

  // const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setTitleFilter(event.target.value);
  // };

  // const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setMinPrice(Number(event.target.value));
  // };

  // const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setMaxPrice(Number(event.target.value));
  // };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitleFilter = event.target.value;
    onFilter(newTitleFilter, minPrice, maxPrice);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = Number(event.target.value);
    onFilter(titleFilter, newMinPrice, maxPrice);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = Number(event.target.value);
    onFilter(titleFilter, minPrice, newMaxPrice);
  };

  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (Array.isArray(newValue)) {
      // setMinPrice(newValue[0]);
      // setMaxPrice(newValue[1]);
      const newMinPrice = newValue[0];
      const newMaxPrice = newValue[1];
      onFilter(titleFilter, newMinPrice, newMaxPrice);
    }
  };

  // const handleApplyFilterClick = () => {
  //   onFilter(titleFilter, minPrice, maxPrice);
  // };

  return (
    <Grid
      container
      spacing={2}
      paddingLeft={3}
      paddingRight={3}
      paddingTop="83px"
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
            max={10000}
            step={10}
            valueLabelDisplay="auto"
          />
        </Box>
      </Grid>

      {/* <Grid item xs={12} sm={6}>
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
      </Grid> */}
    </Grid>
  );
};

export default FilterProducts;
