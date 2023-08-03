import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useProductsContext } from "./ProductsContext";

const Products = () => {
  const { products } = useProductsContext();
  console.log("products in producs.ts", products);
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={4} xl={2}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <Stack spacing={2}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={product.images[0]}
                    alt={product.title}
                    sx={{ borderRadius: 2 }}
                  />
                  <Typography variant="h6" component="div">
                    {product.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </Stack>

                <Stack
                  sx={{ marginTop: "20px" }}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography variant="body2" color="green" fontSize={30}>
                    ${product.price}
                  </Typography>
                  <Button>Order Now</Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
