import React from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/Header";
import ProductsPage from "./components/ProductsPage";
import { CssBaseline } from "@mui/material";

const theme = createTheme();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <ProductsPage />
    </ThemeProvider>
  );
}

export default App;
