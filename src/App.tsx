import React from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/Header";
import ProductsPage from "./components/ProductsPage";
import { CssBaseline } from "@mui/material";
import { ProductsProvider } from "./components/ProductsContext";

const theme = createTheme();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProductsProvider>
        <Header />
        <ProductsPage />
      </ProductsProvider>
    </ThemeProvider>
  );
}

export default App;
