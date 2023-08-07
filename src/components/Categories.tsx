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
import { useEffect, useState } from "react";

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

  const { currCategoryId, setCurrCategoryId, setOffset, setProducts } =
    useAppContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (currCategoryId === null && limitedCategories.length > 0) {
      const firstCategoryId = limitedCategories[0].id;
      setCurrCategoryId(firstCategoryId);
    }
  }, [currCategoryId, limitedCategories, setCurrCategoryId]);

  useEffect(() => {
    if (currCategoryId !== null) {
      setCurrCategoryId(currCategoryId);
      fetchProducts(currCategoryId)
        .then((data) => setProducts(data!))
        .catch((error) => console.log(error));
    }
  }, [currCategoryId, setCurrCategoryId, setProducts]);

  const handleCategoryClick = (categoryId: number) => {
    setCurrCategoryId(categoryId);
    setOffset(initialOffsetValue);
    fetchProducts(categoryId)
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
                handleCategoryClick(category.id);
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
                  handleCategoryClick(category.id);
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
