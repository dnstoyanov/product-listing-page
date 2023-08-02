import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

const Products = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Product 1
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description of product 1.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Products;
