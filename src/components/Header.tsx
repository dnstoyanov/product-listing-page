import { AppBar, Stack, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import logo from "../assets/logo.png";
import Categories from "./Categories";
import axios from "axios";
import { API_URL_2 } from "../api/api";
import { useEffect } from "react";
import { useAppContext } from "./Context";

const Header = () => {
  const { categories, setCategories } = useAppContext();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL_2}`);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toolbarStyles = {
    display: "flex",
    justifyContent: "space-between",
    padding: "0px !important",
  };

  const categoryMenuStyles = {
    display: "flex",
    marginRight: "20px",
    width: isSmallScreen ? undefined : "100%",
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        boxShadow: "0px 2px 2px -2px rgba(0, 0, 0, 0.2)",
        backgroundColor: "white",
      }}
    >
      <Toolbar sx={toolbarStyles}>
        <img
          src={logo}
          style={{
            width: "150px",
            padding: "15px",
            marginLeft: 25,
            marginRight: 25,
          }}
          alt="logo"
        />
        <Stack sx={categoryMenuStyles}>
          <Categories categories={categories} limit={5} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
