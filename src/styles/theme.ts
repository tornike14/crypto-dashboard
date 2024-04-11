import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0d1421",
      paper: "#242424",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#0d1421",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "black",
          textDecoration: "underline",
          "&:hover": {
            textDecoration: "none",
          },
        },
      },
    },
  },
});

export default theme;
