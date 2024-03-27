import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

const styleFont = {
  marginLeft: "5px",
  fontWeight: "bold",
  fontSize: "18px",
  color: "black",
};

const Logout = () => {
  localStorage.clear();
};

export const mainListItems = (
  <React.Fragment>
    <Link to="/" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <ShowChartIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" style={styleFont} />
      </ListItemButton>
    </Link>

    <Link to="/products" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Products" style={styleFont} />
      </ListItemButton>
    </Link>

    <Link to="/staff" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Staff" style={styleFont} />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <Link to="/add-products" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Add-Product" style={styleFont} />
      </ListItemButton>
    </Link>

    <Link to="/add-staff" style={linkStyle}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Add-Staff" style={styleFont} />
      </ListItemButton>
    </Link>

    <Link to={"/login"} style={linkStyle}>
      <ListItemButton onClick={Logout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" style={styleFont} />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
