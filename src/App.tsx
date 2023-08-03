import React from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/Header";
import ProductsPage from "./components/ProductsPage";
import { CssBaseline } from "@mui/material";
import { AppContextProvider } from "./components/Context";

const theme = createTheme();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContextProvider>
        <Header />
        <ProductsPage />
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;
