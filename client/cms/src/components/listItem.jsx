import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

export const mainListItems = (
  <React.Fragment>
    <Link to="/">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItemButton>
    </Link>
    <Link to="/add-products">
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Add-Product" />
      </ListItemButton>
    </Link>
    <Link to="/staff">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Staff" />
      </ListItemButton>
    </Link>
    <Link to="/">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Add-Jobs" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

// const navigate = useNavigate()
export const secondaryListItems = (
  <Link to={"/login"}>
  <ListItemButton onClick={()=>{
    localStorage.clear()
  }}>
    <ListItemIcon>
      <LogoutIcon />
    </ListItemIcon>
    <ListItemText primary="Logout" />
  </ListItemButton>
  </Link>
);
