import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import MenuItemLink from "./menuItemLink";

const logoStyle = {
  width: "140px",
  height: "auto",
  color: "black",
  marginLeft: "50px",
};

function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    // Check local storage for access token
    const accessToken = localStorage.getItem("access_token");
    setIsLoggedIn(accessToken);
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    // Clear access token from local storage
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}>
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <Typography style={logoStyle}>Vaperasoy</Typography>
              </Link>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {isLoggedIn && (
                  <>
                    <MenuItemLink to="/profile" pathName={pathName}>
                      Profile
                    </MenuItemLink>
                    <MenuItemLink to="/products" pathName={pathName}>
                      Products
                    </MenuItemLink>
                    <MenuItemLink to="/cart" pathName={pathName}>
                      Cart
                    </MenuItemLink>
                    {/* <MenuItemLink to="/pricing" pathName={pathName}>Pricing</MenuItemLink>
          <MenuItemLink to="/faq" pathName={pathName}>FAQ</MenuItemLink> */}
                  </>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}>
              {isLoggedIn ? (
                <Link to={"/"}>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={handleLogout}>
                    Logout
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to={"/login"}>
                    <Button
                      color="primary"
                      variant="text"
                      size="small"
                      component="a"
                      target="_blank">
                      Sign in
                    </Button>
                  </Link>

                  <Link to={"/register"}>
                    <Button
                      color="primary"
                      variant="contained"
                      size="small"
                      target="_blank">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </Box>

            {/* Mobile */}
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}>
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}></Box>
                  {isLoggedIn ? (
                    <>
                      <MenuItemLink to="/profile" pathName={pathName}>
                        Profile
                      </MenuItemLink>
                      <MenuItemLink to="/products" pathName={pathName}>
                        Products
                      </MenuItemLink>
                      <MenuItemLink to="/cart" pathName={pathName}>
                        Cart
                      </MenuItemLink>
                      {/* <MenuItemLink to="/pricing" pathName={pathName}>Pricing</MenuItemLink>
          <MenuItemLink to="/faq" pathName={pathName}>FAQ</MenuItemLink> */}
                    </>
                  ) : null}
                  <Divider />
                  {isLoggedIn ? (
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleLogout}
                      sx={{ width: "100%" }}>
                      Logout
                    </Button>
                  ) : (
                    <>
                      <Link to={"/register"} style={{ textDecoration: "none" }}>
                        <MenuItem>
                          <Button
                            color="primary"
                            variant="contained"
                            sx={{ width: "100%" }}>
                            Sign up
                          </Button>
                        </MenuItem>
                      </Link>

                      <Link to={"/login"} style={{ textDecoration: "none" }}>
                        <MenuItem>
                          <Button
                            color="primary"
                            variant="outlined"
                            sx={{ width: "100%" }}>
                            Sign in
                          </Button>
                        </MenuItem>
                      </Link>
                    </>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
