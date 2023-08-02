import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material/";

const handleChange = () => {
  console.log("Changed");
};
const SortField = () => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
          value={""}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortField;
