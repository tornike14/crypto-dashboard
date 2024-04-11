import { AppBar, Toolbar, Button, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ROUTES from "../../libs/routes";

import CompnayLogo from "../../assets/company/bonny_group_logo.svg";

const Header = ({ showNavigation = true }: { showNavigation?: boolean }) => {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          {/* Logo and Title */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link
              to={ROUTES.DASHBOARD}
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <img
                src={CompnayLogo}
                alt="Bonny group logo"
                style={{ width: 50, height: "auto" }}
              />
            </Link>
          </Box>

          {showNavigation && (
            <Box>
              <Button color="inherit" component={Link} to={ROUTES.DASHBOARD}>
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to={ROUTES.DEX}>
                DEX
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
