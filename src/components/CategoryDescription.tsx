import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppContext } from "./Context";
import { fetchCategoryById } from "../api/api";

const CategoryDescription = () => {
  const { currCategoryId } = useAppContext();
  const [name, setName] = useState<string>();
  useEffect(() => {
    fetchCategoryById(currCategoryId!)
      .then((data) => setName(data!.name))
      .catch((error) => console.log(error));
  });
  return (
    <Box>
      <Typography variant="h4">{name}</Typography>
    </Box>
  );
};

export default CategoryDescription;
