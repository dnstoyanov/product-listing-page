import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material/";

interface SortFieldProps {
  sortingOption: string;
  onSortChange: (selectedOption: string) => void;
}

const SortField: React.FC<SortFieldProps> = ({
  sortingOption,
  onSortChange,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedOption = event.target.value;
    onSortChange(selectedOption);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select id="simple-sort" onChange={handleChange} value={sortingOption}>
          <MenuItem value="ALPHABETICAL_A_TO_Z">Alphabetical A-Z</MenuItem>
          <MenuItem value="ALPHABETICAL_Z_TO_A">Alphabetical Z-A</MenuItem>
          <MenuItem value="PRICE_ASCENDING">Price ascending</MenuItem>
          <MenuItem value="PRICE_DESCENDING">Price descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortField;
