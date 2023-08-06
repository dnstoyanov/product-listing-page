import {
  Grid,
  Stack,
  Menu,
  MenuItem,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { fetchProducts } from "../api/api";
import { useAppContext, initialOffsetValue } from "./Context";
import { useEffect, useRef, useState } from "react";

export interface Category {
  createdAt: string;
  id: number;
  image: string;
  name: string;
  updatedAt: string;
}

interface CategoriesProps {
  categories: Category[];
  limit: number;
}

const Categories = ({ categories, limit }: CategoriesProps) => {
  const theme = useTheme();
  const limitedCategories = categories.slice(0, limit);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const { setCurrCategoryId, setOffset, setProducts } = useAppContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchProductsRef = useRef(fetchProducts);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (selectedCategoryId === null && limitedCategories.length > 0) {
      const firstCategoryId = limitedCategories[0].id;
      setSelectedCategoryId(firstCategoryId);
      setCurrCategoryId(firstCategoryId);
    }
  }, [selectedCategoryId, limitedCategories, setCurrCategoryId]);

  useEffect(() => {
    if (selectedCategoryId !== null) {
      setCurrCategoryId(selectedCategoryId);
      fetchProductsRef
        .current(selectedCategoryId)
        .then((data) => setProducts(data!))
        .catch((error) => console.log(error));
    }
  }, [selectedCategoryId, setCurrCategoryId, setProducts]);

  const handleCategoryClick = (categoryId: number, category: Category) => {
    setCurrCategoryId(categoryId);
    setOffset(initialOffsetValue);
    fetchProductsRef
      .current(categoryId)
      .then((data) => setProducts(data!))
      .catch((error) => console.log(error));
  };

  return (
    <>
      {isSmallScreen && (
        <IconButton
          size="large"
          edge="end" // Place the icon on the right side
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon sx={{ color: "#000", fontSize: "50px" }} />
        </IconButton>
      )}
      <Grid container justifyContent={isSmallScreen ? "center" : "flex-start"}>
        {!isSmallScreen ? (
          limitedCategories.map((category: Category) => (
            <Grid
              item
              xs={12}
              sm={3}
              md={2}
              key={category.id}
              onClick={() => {
                handleCategoryClick(category.id, category);
              }}
            >
              <Stack
                sx={{
                  textAlign: "center",
                  color: "black",
                  cursor: "pointer",
                  padding: "10px",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#1976d2",
                    color: "white",
                  },
                }}
              >
                {category.name}
              </Stack>
            </Grid>
          ))
        ) : (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {limitedCategories.map((category: Category) => (
              <MenuItem
                key={category.id}
                onClick={() => {
                  handleCategoryClick(category.id, category);
                  handleMenuClose();
                }}
              >
                {category.name}
              </MenuItem>
            ))}
          </Menu>
        )}
      </Grid>
    </>
  );
};

export default Categories;
