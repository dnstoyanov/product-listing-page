import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { Product, useAppContext } from "./Context";

interface ProductsProps {
  filteredProducts: Product[];
}

const Products: React.FC<ProductsProps> = ({ filteredProducts }) => {
  const handleAddToCart = () => {
    alert("Product added to cart");
  };

  return (
    <Grid container spacing={2}>
      {filteredProducts.map((product) => (
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
                  <Typography variant="body2" color="#7ec33c" fontSize={30}>
                    ${product.price}
                  </Typography>
                  <Button
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#1565c0",
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => handleAddToCart()}
                  >
                    Order Now
                  </Button>
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
