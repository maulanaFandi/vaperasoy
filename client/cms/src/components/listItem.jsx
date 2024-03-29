import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import LogoutIcon from "@mui/icons-material/Logout";

import NavLink from "../components/navLink";
import { Link } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

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
    <NavLink to="/cms/dashboard" icon={<ShowChartIcon />} text="Dashboard" />

    <NavLink to="/cms/products" icon={<DashboardIcon />} text="Products" />

    <NavLink to="/cms/staff" icon={<PeopleIcon />} text="Staff" />

    <NavLink to="/cms/users" icon={<PeopleIcon />} text="User" />
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <NavLink
      to="/cms/add-products"
      icon={<DashboardIcon />}
      text="Add-Product"
    />

    <NavLink to="/cms/add-staff" icon={<PeopleIcon />} text="Add-Staff" />

    <Link to={"/login"} style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton onClick={Logout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" style={styleFont} />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
