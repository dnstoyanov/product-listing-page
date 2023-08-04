import React from "react";
import {
  Typography,
  Container,
  Grid,
  Link,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";

const Footer = () => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        padding: 2,
        color: "common.white",
        marginTop: "auto",
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid
          item
          xs={12}
          md={6}
          sx={{ textAlign: isSmallScreen ? "center" : "left" }}
        >
          <Typography variant="body1" color="inherit">
            © {new Date().getFullYear()} Your Company Name
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="body1"
            color="inherit"
            sx={{
              textAlign: isSmallScreen ? "center" : "right",
              marginTop: isSmallScreen ? "10px" : undefined,
            }}
          >
            <Link href="/" sx={{ color: "common.white", p: 1 }}>
              About Us
            </Link>
            <Link href="/" sx={{ color: "common.white", p: 1 }}>
              T&amp;C
            </Link>
            <Link href="/" sx={{ color: "common.white", p: 1 }}>
              Privacy Policy
            </Link>
            <Link href="/" sx={{ color: "common.white", p: 1 }}>
              Contact Us
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
