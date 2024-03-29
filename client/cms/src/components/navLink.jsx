import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

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

const NavLink = ({ to, icon, text, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} style={linkStyle}>
      <ListItemButton style={{ backgroundColor: isActive ? "lightblue" : "" }}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} style={styleFont} />
      </ListItemButton>
    </Link>
  );
};

export default NavLink;
