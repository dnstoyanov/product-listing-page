import { Box, Typography } from "@mui/material";
import React from "react";
import { useAppContext } from "./Context";

const CategoryDescription = () => {
  const { selectedCategory } = useAppContext();
  return (
    <Box>
      <Typography variant="h4">{selectedCategory?.name}</Typography>
    </Box>
  );
};

export default CategoryDescription;
