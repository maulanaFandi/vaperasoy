import { MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function MenuItemLink({
  to,
  pathName,
  children,
}) {
  return (
    <MenuItem sx={{ py: "6px", px: "12px" }} selected={pathName === to}>
      <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
        <Typography variant="body2" color="text.primary">
          {children}
        </Typography>
      </Link>
    </MenuItem>
  );
}
