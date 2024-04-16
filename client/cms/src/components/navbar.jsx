import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, secondaryListItems } from "../components/listItem";
import { useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const NavBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "fixed",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openSpedial, setOpenSpeedial] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleSpeedialOpen = () => {
    setOpenSpeedial(true);
  };

  const handleSpeedialClose = () => {
    setOpenSpeedial(false);
  };

  const handleChatChange = () => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  const speedDialActions = [
    {
      name: "Chat With Us",
      icon: <HeadsetMicIcon />,
      onClick: () => {
        if (isLoggedIn) {
          // Buka modal ketika aksi "Chat With Us" dijalankan
          setOpenChat(true);
        } else {
          // Jika pengguna belum login, arahkan ke halaman login
          navigate("/login");
        }
      },
    },
  ];
  return (
    <>
      <Box display="flex">
        <NavBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}>
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                marginLeft: "20px",
                fontWeight: "bold",
                fontSize: "30px",
              }}>
              Vaperasoy
            </Typography>
            <IconButton color="inherit"></IconButton>
          </Toolbar>
        </NavBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
      </Box>

      <Modal
        open={openChat}
        onClose={() => setOpenChat(false)}
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
            onChange={handleChatChange}
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
          onClose={handleSpeedialClose}
          onOpen={handleSpeedialOpen}
          open={openSpedial}>
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
