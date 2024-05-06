import React, { useState, useEffect } from "react";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuItemLink from "./menuItemLink";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import LogoPNG from "../assets/vapersoy.logo.png";


const logoStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "10%",
  marginTop: "10px",
};

function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const [openChatModal, setOpenChatModal] = useState(false); // State untuk membuka/menutup modal chat room
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  const handleSpeedDialOpen = () => {
    setOpenSpeedDial(true);
  };

  const handleSpeedDialClose = () => {
    setOpenSpeedDial(false);
  };

  const speedDialActions = [
    {
      name: "Chat With Us",
      icon: <HeadsetMicIcon />,
      onClick: () => {
        if (isLoggedIn) {
          // Buka modal ketika aksi "Chat With Us" dijalankan
          setOpenChatModal(true);
        } else {
          // Jika pengguna belum login, arahkan ke halaman login
          navigate("/login");
        }
      },
    },
  ];

  useEffect(() => {
    // Check local storage for access token
    const accessToken = localStorage.getItem("access_token");
    setIsLoggedIn(accessToken);
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <Box>
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
                }}>
                  <img src={LogoPNG} alt="Logo" style={logoStyle}/>
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  {isLoggedIn && (
                    <>
                      {/* <MenuItemLink to={"/profile"} pathName={pathName}>
                        Profile
                      </MenuItemLink> */}
                      <MenuItemLink to={"/products"} pathName={pathName}>
                        Products
                      </MenuItemLink>
                      <MenuItemLink to={"/cart"} pathName={pathName}>
                        Cart
                      </MenuItemLink>
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
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={handleLogout}>
                    <Link
                      to={"/"}
                      style={{ color: "inherit", textDecoration: "none" }}>
                      Logout
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Link to={"/login"} style={{ textDecoration: "none" }}>
                      <Button color="primary" variant="text" size="small">
                        Sign in
                      </Button>
                    </Link>

                    <Link to={"/register"} style={{ textDecoration: "none", marginLeft: "10px" }}>
                      <Button color="primary" variant="contained" size="small">
                        Register
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
                <Drawer
                  anchor="right"
                  open={open}
                  onClose={toggleDrawer(false)}>
                  <Box
                    sx={{
                      minWidth: "60vw",
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
                      </>
                    ) : null}
                    <Divider />
                    {isLoggedIn ? (
                      <Link to={"/"} style={{ textDecoration: "none" }}>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={handleLogout}
                          sx={{ width: "100%" }}>
                          Logout
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Link
                          to={"/register"}
                          style={{ textDecoration: "none" }}>
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
      </Box>

      {/* Modal untuk chat room */}
      <Modal
        open={openChatModal}
        onClose={() => setOpenChatModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Chat Room
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ mb: 2 }}>
            {messages.map((msg, index) => (
              <Typography key={index} variant="body1">
                {msg}
              </Typography>
            ))}
          </Box>
          <TextField
            id="message"
            label="Message"
            variant="outlined"
            fullWidth
            value={message}
            onChange={handleMessageChange}
          />
          <Button variant="contained" onClick={handleSendMessage}>
            Send
          </Button>
        </Box>
      </Modal>

      <Box>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          direction="left"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleSpeedDialClose}
          onOpen={handleSpeedDialOpen}
          open={openSpeedDial}>
          {speedDialActions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick}
            />
          ))}
        </SpeedDial>
      </Box>
    </>
  );
}

export default AppAppBar;
