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
import axios from "axios";
import { API_URL_2, offset, limitNum } from "../api/api";
import { useAppContext } from "./Context";
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
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const { setProducts } = useAppContext();
  const { setSelectedCategory, setCurrCategoryId } = useAppContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchProducts = async (categoryId: number | null) => {
    if (categoryId !== null) {
      try {
        const response = await axios.get(
          `${API_URL_2}/${categoryId}/products?offset=${offset}&limit=${limitNum}`
        );
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
      setSelectedCategory(limitedCategories[0]);
    }
  }, [selectedCategoryId, limitedCategories, setSelectedCategory]);

  useEffect(() => {
    if (selectedCategoryId !== null) {
      setCurrCategoryId(selectedCategoryId);
      fetchProducts(selectedCategoryId);
    }
  }, [selectedCategoryId]);

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
                setCurrCategoryId(category.id);
                setSelectedCategory(category);
                fetchProducts(category.id);
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
                  setCurrCategoryId(category.id);
                  setSelectedCategory(category);
                  fetchProducts(category.id);
                  handleMenuClose(); // Close the menu after selecting a category
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
