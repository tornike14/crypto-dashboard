import { Box, Typography, Container } from "@mui/material";
import Header from "./Header";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../styles/theme";
import CssBaseline from "@mui/material/CssBaseline";

const ErrorFallbackComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header showNavigation={false} />
        <Container
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" textAlign="center">
            Sorry for the inconvenience, we're working on fixing the issue!
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ErrorFallbackComponent;
