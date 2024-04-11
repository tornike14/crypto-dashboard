import Header from "./components/layout/Header";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackComponent from "./components/layout/ErrorFallback";
import Views from "./views";

import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import "./styles/global.scss";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary fallback={<ErrorFallbackComponent />}>
        <CssBaseline />
        <div className="app">
          <Header />
          <Views />
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
