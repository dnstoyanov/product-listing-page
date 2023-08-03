import { AppBar, Toolbar } from "@mui/material";
import logo from "../assets/logo.png";
import Categories from "./Categories";
import axios from "axios";
import { API_URL_2 } from "../api/api";
import { useEffect, useState } from "react";

const Header = () => {
  const [categories, setCategories] = useState([]);

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
  return (
    <AppBar
      position="sticky"
      sx={{
        boxShadow: "0px 2px 2px -2px rgba(0, 0, 0, 0.2)",
        backgroundColor: "white",
      }}
    >
      <Toolbar
        sx={{
          alignItems: "flex-end",
          padding: "0px !important",
        }}
      >
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
        <Categories categories={categories} limit={5} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
